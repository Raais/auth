import {
  Controller,
  Get,
  Request,
  Post,
  Query,
  Res,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { Themes } from './data/constants';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('/')
  index(@Res() res) {
    return res.redirect(302, '/signin');
  }

  @Get('signin')
  logIn(@Res() res) {
    return res.redirect(302, '/login/authorize');
  }

  @Get('login/authorize')
  signIn(
    @Query('redirect_url') redirectUrl: string = '/profile',
    @Query('from') from: string = '',
    @Query('css') theme: string = '3',
  ) {
    const comments = {
      auth_null: '<p>Session expired.</p>',
      invalid_credentials: '<p>Invalid credentials.</p>',
    };
    const comment = comments[from] || '';
    const themes = {
      1: Themes.blue,
      2: Themes.dark,
      3: Themes.neon,
      4: Themes.green,
    };
    const css = themes[theme];
    return `<!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><html>
      <title>Authorize: ${redirectUrl}</title>
      <style>
        ${css}
      </style>
    </head>
    <body>
    <form method="post" action="/api/auth/login">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <input type="hidden" id="url" name="url" value="${redirectUrl}">
      ${comment}
      <br>
      <button type="submit">Login</button>
    </form>
    </body>
  </html>`;
  }

  @UseGuards(LocalAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  @Post('api/auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const token = (await this.authService.login(req.user)).access_token;
    if (token) {
      const redirectUrl = `${req.body.url}?token=${token}`;
      return res
        .cookie('token', token, {
          httpOnly: true,
          sameSite: 'strict',
          signed: true,
          secure: true,
        })
        .redirect(302, redirectUrl);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  @Get('profile')
  getProfile(@Request() req, @Query('token') token: string) {
    if (token) {
    }
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><html>
        <title>Profile</title>
      </head>
      <body>
        <p>hi, ${req.user.username}</p>
        <br>
        <a href="/chat">chat</a>
        <a href="/user/info">user info</a>
        <a href="/api/auth/logout">Logout</a>

        <script async>
        </script>
      </body>
    </html>`;
  }

  private getData(url: string, token: string, out: string = 'res') {
    return `
    let ${out};
    const _RES = await fetch('${url}', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${token}'
      },
    });
    ${out} = await _RES.json();
    `;
  }

  private postData(
    url: string,
    payload: string,
    token: string,
    out: string = 'res',
  ) {
    return `
    let ${out};
    const _RES = await fetch('${url}', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${token}'
      },
      body: '${payload}'
    });
    ${out} = await _RES.json();
    `;
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  @Get('chat')
  async chat(@Request() req) {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><html>
        <title>Chat</title>
      </head>
      <body>
        <h2>Chat</h2>
        <div id="chats"></div>
        <form method="post" action="/api/chat/add">
      <input type="text" id="message" name="message" required>
      <input type="hidden" id="userId" name="userId" value="${req.user.userId}">
      <br>
      <button type="submit">Send</button>
    </form>

        <script async>
          async function main() {
            const chatsDiv = document.getElementById('chats');

            ${this.getData('/api/chat/get', req.signedCookies.token, 'res')}
            res.map((m)=>{
              const messageElement = document.createElement('p');
              const string = m.author_name + " : " + m.message;
              messageElement.textContent = string;
              chatsDiv.appendChild(messageElement);
            });
          }
          main();
        </script>
      </body>
    </html>
  `;
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  @Get('user/info')
  async userInfo(@Request() req) {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><html>
        <title>User Info</title>
      </head>
      <body>
        <p>hi</p>
        <label for="userInfo">User Info:</label>
        <span id="userInfo"></span>
        <br>
        <a href="/profile">profile</a>
        <a href="/api/auth/logout">Logout</a>

        <script async>
          async function main() {
            ${this.getData('/api/user/info', req.signedCookies.token, 'res')}
            document.getElementById('userInfo').innerText = res.message;
          }
          main();
        </script>
      </body>
    </html>
  `;
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  @Get('api/user/info')
  async info(@Request() req) {
    return this.usersService.userInfo(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  @Get('api/chat/get')
  async getchat() {
    return this.usersService.getChats();
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  @Post('api/chat/add')
  async addchat(@Request() req, @Res({ passthrough: true }) res: Response) {
    await this.usersService.addChat(+req.body.userId, req.body.message);
    return res.status(200).redirect('/chat');
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  @Get('api/auth/logout')
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    const redirectUrl = `/login/authorize`;
    res.status(200).clearCookie('token', {
      path: '/',
    });
    res.redirect(302, redirectUrl);
  }
}
