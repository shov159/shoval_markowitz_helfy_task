frontend:
cd frontend
npm i
npm run dev

backend:
cd backend
npm i
npm start

- GET /api/tasks -- alltasks

- POST /api/tasks
  body: {
  title: string,
  description: string,
  priority: 'low' | 'medium' | 'high',
  completed: boolean (default false)
  }

- PUT /api/tasks/:id
  body: {
  title: string,
  description: string,
  priority: 'low' | 'medium' | 'high',
  completed: boolean (default false)
  }

- DELETE /api/tasks/:id

- PATCH /api/tasks/:id/toggle

//~estimations
backend - 40 min
frontend breakdown:

basic task list 30 min
carouselle: 55 min
edit/create: 55 min
delete: 10 min
complete functionallity: 10 min
ui/ux: 30 min
code quality: 40 min
