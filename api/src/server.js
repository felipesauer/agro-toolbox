import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { router } from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AgroToolbox API',
      version: '1.0.0',
      description: 'Suite de ferramentas e calculadoras para o agronegócio brasileiro',
    },
    servers: [{ url: `/api/v1` }],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1', router);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(import.meta.dirname, '../../web/dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
  });
});

app.listen(PORT, () => {
  console.log(`🌾 AgroToolbox API rodando na porta ${PORT}`);
  console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
});

export { app };
