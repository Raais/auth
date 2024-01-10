export const Themes = {
  green: `
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    
    form {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    label {
      display: block;
      margin-bottom: 8px;
    }
    
    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    button {
      background-color: #4caf50;
      color: #ffffff;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #45a049;
    }
    
    p {
      color: #d9534f;
      margin-top: 10px;
    }
    `,
  dark: `
    body {
      font-family: 'Arial', sans-serif;
      background-color: #1a1a1a;
      color: #ffffff;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    
    form {
      background-color: #333333;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      color: #ffffff;
    }
    
    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
      border: 1px solid #555555;
      border-radius: 4px;
      color: #ffffff;
      background-color: #444444;
    }
    
    button {
      background-color: #2ecc71;
      color: #ffffff;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #27ae60;
    }
    
    p {
      color: #e74c3c;
      margin-top: 10px;
    }
  `,
  neon: `
    body {
      font-family: 'Arial', sans-serif;
      background-color: #111;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      color: #fff;
    }
    
    form {
      background-color: #1f1f1f;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      color: #7f7f7f;
    }
    
    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
      border: 1px solid #444;
      border-radius: 4px;
      background-color: #333;
      color: #fff;
    }
    
    button {
      background-color: #00ff00;
      color: #000;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #00e600;
    }
    
    p {
      color: #ff4444;
      margin-top: 10px;
    }
    `,
  blue: `
    body {
      font-family: 'Arial', sans-serif;
      background-color: #17202A;
      color: #ffffff;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    
    form {
      background-color: #34495E;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      color: #ffffff;
    }
    
    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
      border: 1px solid #2C3E50;
      border-radius: 4px;
      color: #ffffff;
      background-color: #2C3E50;
    }
    
    button {
      background-color: #3498db;
      color: #ffffff;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #2980b9;
    }
    
    p {
      color: #e74c3c;
      margin-top: 10px;
    }
  `,
};

export const notFoundPage = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 Not Found</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #111;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: #fff;
    }

    .container {
      max-width: 400px;
      padding: 20px;
      background-color: #1f1f1f;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    }

    h1 {
      color: #e74c3c;
      font-size: 3em;
      margin-bottom: 10px;
    }

    p {
      color: #7f7f7f;
      font-size: 1.2em;
      margin-bottom: 20px;
    }

    a {
      color: #3498db;
      text-decoration: none;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>404 Not Found</h1>
    <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
    <p>Go back to <a href="/">home</a> or contact the site administrator.</p>
  </div>
</body>
</html>


`;
