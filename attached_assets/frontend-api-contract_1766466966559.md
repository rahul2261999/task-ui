## Frontend API Contract

This document describes the HTTP API and TypeScript interfaces that the frontend should use when talking to the Todo backend.

- **Base URL**: e.g. `http://localhost:8080`
- **Content Type**: `application/json`
- **Auth Header for protected routes**:

```http
Authorization: Bearer <jwt-token>
```

---

## Common Response Shapes

All successful responses are wrapped in an envelope:

```ts
interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
}
```

Errors are also wrapped:

```ts
interface ApiError {
  code: string;      // e.g. "bad_request" | "validation_error" | "unauthorized" | ...
  message: string;
  details?: unknown;
}
```

---

## Authentication Endpoints

### `POST /auth/signup`

- **Description**: Register a new user and receive an authentication token.
- **Auth**: Public (no token).
- **Request body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "my-strong-password"
}
```

- **Response 201**:

```json
{
  "message": "User signed up successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "status": "pending",
      "type": "regular"
    },
    "token": "<jwt-token>"
  }
}
```

### `POST /auth/signin`

- **Description**: Login with email and password and receive an authentication token.
- **Auth**: Public (no token).
- **Request body**:

```json
{
  "email": "john@example.com",
  "password": "my-strong-password"
}
```

- **Response 200**:

```json
{
  "message": "User logged in successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "status": "active",
      "type": "regular"
    },
    "token": "<jwt-token>"
  }
}
```

Use the returned token with:

```http
Authorization: Bearer <jwt-token>
```

---

## User Endpoints

All `/user` endpoints **require** a valid JWT in the `Authorization` header.

### `GET /user`

- **Description**: Get the profile of the currently authenticated user.
- **Response 200**:

```json
{
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "status": "active",
    "type": "regular"
  }
}
```

### `PATCH /user`

- **Description**: Update basic user information.
- **Request body (example)**:

```json
{
  "name": "New Name",
  "email": "new@example.com"
}
```

- **Response 200**: Same shape as `GET /user`.

### `PATCH /user/update/status`

- **Description**: Update the user status.
- **Request body**:

```json
{
  "status": "active"
}
```

### `PATCH /user/update/password`

- **Description**: Update the user password.
- **Request body**:

```json
{
  "current_password": "old-password",
  "new_password": "new-strong-password"
}
```

### `DELETE /user`

- **Description**: Delete the currently authenticated user.
- **Response 200**:

```json
{
  "message": "user deleted successfully"
}
```

---

## Todo Endpoints

All `/todo` endpoints **require** a valid JWT in the `Authorization` header.

### `POST /todo`

- **Description**: Create a new todo for the authenticated user.
- **Request body**:

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "due_date": "2025-12-31T23:59:59Z"
}
```

- **Response 201** (example):

```json
{
  "message": "Todo created successfully",
  "data": {
    "id": 10,
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "pending",
    "user_id": 1,
    "due_date": "2025-12-31T23:59:59Z",
    "created_at": "2025-12-22T10:00:00Z",
    "updated_at": "2025-12-22T10:00:00Z",
    "created_by": 1,
    "updated_by": 1
  }
}
```

### `GET /todo/list`

- **Description**: List all todos for the authenticated user.
- **Response 200** (example):

```json
{
  "message": "Todos retrieved successfully",
  "data": [
    {
      "id": 10,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": "pending",
      "user_id": 1,
      "due_date": "2025-12-31T23:59:59Z",
      "created_at": "2025-12-22T10:00:00Z",
      "updated_at": "2025-12-22T10:00:00Z",
      "created_by": 1,
      "updated_by": 1
    }
  ]
}
```

### `GET /todo/{todo_id}`

- **Description**: Get a single todo by its ID.

### `PATCH /todo/{todo_id}`

- **Description**: Update fields of an existing todo.
- **Request body (example)**:

```json
{
  "title": "Buy groceries and snacks",
  "description": "Milk, eggs, bread, chips",
  "status": "completed"
}
```

### `DELETE /todo/{todo_id}`

- **Description**: Delete a todo by its ID.
- **Response 200**:

```json
{
  "message": "Todo deleted successfully"
}
```

---

## TypeScript Interfaces for the Frontend

Paste the following into your frontend codebase (e.g. `api-types.ts`) so your UI agent can rely on strong types.

```ts
// ===== Common =====

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// ===== User & Auth types =====

export type UserStatus =
  | 'pending'
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'deleted';

export type UserType = 'regular' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  type: UserType;
}

export interface SignupRequest {
  name: string;     // required, min length 3
  email: string;    // required, must contain '@'
  password: string; // required, min length 8
}

export interface SigninRequest {
  email: string;    // required, must contain '@'
  password: string; // required, min length 8
}

export interface AuthPayload {
  user: User;
  token: string;
}

export type SignupResponse = ApiResponse<AuthPayload>;
export type SigninResponse = ApiResponse<AuthPayload>;

export interface UpdateUserRequest {
  name?: string;    // if present, min length 3
  email?: string;   // if present, must contain '@'
}

export interface UpdateUserStatusRequest {
  status: UserStatus;
}

export interface UpdateUserPasswordRequest {
  current_password: string;
  new_password: string; // min length 8, different from current_password
}

export type GetUserResponse = ApiResponse<User>;
export type UpdateUserResponse = ApiResponse<User>;
export type UpdateUserStatusResponse = ApiResponse<User>;
export type UpdateUserPasswordResponse = ApiResponse<User>;
export type DeleteUserResponse = ApiResponse<null>;

// ===== Todo types =====

export type TodoStatus =
  | 'pending'
  | 'inprogress'
  | 'completed'
  | 'cancelled';

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  user_id: number;
  due_date: string | null; // ISO 8601
  created_at: string;      // ISO 8601
  updated_at: string;      // ISO 8601
  created_by: number;
  updated_by: number;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
  due_date?: string; // ISO 8601, not in the past
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  status?: TodoStatus;
  due_date?: string;
}

export type CreateTodoResponse = ApiResponse<Todo>;
export type GetTodoResponse = ApiResponse<Todo>;
export type ListTodosResponse = ApiResponse<Todo[]>;
export type UpdateTodoResponse = ApiResponse<Todo>;
export type DeleteTodoResponse = ApiResponse<null>;

// ===== Endpoint metadata (optional for tooling) =====

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export interface EndpointDescription {
  method: HttpMethod;
  path: string;
  requiresAuth: boolean;
  requestType?: string;
  responseType: string;
}

export const endpoints: EndpointDescription[] = [
  { method: 'POST', path: '/auth/signup', requiresAuth: false, requestType: 'SignupRequest', responseType: 'SignupResponse' },
  { method: 'POST', path: '/auth/signin', requiresAuth: false, requestType: 'SigninRequest', responseType: 'SigninResponse' },

  { method: 'GET', path: '/user', requiresAuth: true, responseType: 'GetUserResponse' },
  { method: 'PATCH', path: '/user', requiresAuth: true, requestType: 'UpdateUserRequest', responseType: 'UpdateUserResponse' },
  { method: 'PATCH', path: '/user/update/status', requiresAuth: true, requestType: 'UpdateUserStatusRequest', responseType: 'UpdateUserStatusResponse' },
  { method: 'PATCH', path: '/user/update/password', requiresAuth: true, requestType: 'UpdateUserPasswordRequest', responseType: 'UpdateUserPasswordResponse' },
  { method: 'DELETE', path: '/user', requiresAuth: true, responseType: 'DeleteUserResponse' },

  { method: 'POST', path: '/todo', requiresAuth: true, requestType: 'CreateTodoRequest', responseType: 'CreateTodoResponse' },
  { method: 'GET', path: '/todo/list', requiresAuth: true, responseType: 'ListTodosResponse' },
  { method: 'GET', path: '/todo/{todo_id}', requiresAuth: true, responseType: 'GetTodoResponse' },
  { method: 'PATCH', path: '/todo/{todo_id}', requiresAuth: true, requestType: 'UpdateTodoRequest', responseType: 'UpdateTodoResponse' },
  { method: 'DELETE', path: '/todo/{todo_id}', requiresAuth: true, responseType: 'DeleteTodoResponse' }
];
```



