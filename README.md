# gRPC Logger for NestJS  

A robust **gRPC interceptor** for **NestJS** applications that provides structured and detailed logging. This interceptor captures essential request and response details, including:  

- **Method Name**: The gRPC method being invoked.  
- **Client IP**: The originating IP address of the request.  
- **Metadata**: Any metadata sent along with the request.  
- **Request Data**: The payload received by the server.  
- **Response Time**: Time taken to process the request. 


## Installation

You can install the gRPC logger using npm:

```bash
npm i tablic-grpc-logger
```

## Example Log Output
![Screenshot 2025-03-08 at 10 26 34 PM](https://github.com/user-attachments/assets/c976c1a9-5f09-4788-b31e-0235bd0fb353)

![Screenshot 2025-03-08 at 10 26 15 PM](https://github.com/user-attachments/assets/b901ca74-e1f1-4d8d-b77e-8ca4f924622d)

## Usage in a NestJS App

To use the gRPC logger in your NestJS application, import the `LoggingInterceptor` in your controller and apply it using the `@UseInterceptors()` decorator:

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { LoggingInterceptor } from 'tablic-grpc-logger';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('UserService', 'GetUserById')

  getUserById(data: { id: string }) {
    const users = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ];

    const user = users.find((user) => user.id === data.id);
    if (!user) {
      return { error: 'User not found' };
    }

    return { user };
  }
}
```

## Contribution

We welcome contributions to improve this project! Here are some ways you can contribute:

- **Bug Fixes**: If you find a bug, please submit an issue on GitHub and, if possible, provide a fix in a pull request.
- **Feature Requests**: Have an idea for a new feature? Open an issue with a description of the feature, and we can discuss it.
- **Code Improvements**: Feel free to suggest or submit code improvements for better performance, cleaner code, etc.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Run tests (if applicable) and ensure everything works as expected.
5. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.

## Issues

If you encounter any issues or have questions, please feel free to open an issue on GitHub. Make sure to include relevant information such as error messages, system environment, and steps to reproduce the issue.
