import { Mastra } from "@mastra/core";
import { PgVector } from "@mastra/pg";
import {financialAnalystAgent} from "./agents/financialAnalyst-agent"
import {weatherAgent} from "./agents/weather-agent"
import {weatherWorkflow} from "./workflows/weather-workflow"
// import {pdfEmbedWorkflow} from "./workflows/pdfembed-workflow"
 
// Initialize Mastra instance
const pgVector = new PgVector({
  connectionString: process.env.DATABASE_URL!,
});
export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { financialAnalystAgent, weatherAgent },
  vectors: { pgVector },
});


// import { Mastra } from '@mastra/core/mastra';
// import { PinoLogger } from '@mastra/loggers';
// import { LibSQLStore } from '@mastra/libsql';
// import { weatherWorkflow } from './workflows/weather-workflow';
// import { weatherAgent } from './agents/weather-agent';

// export const mastra = new Mastra({
//   workflows: { weatherWorkflow },
//   agents: { weatherAgent },
//   storage: new LibSQLStore({
//     // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
//     url: ":memory:",
//   }),
//   logger: new PinoLogger({
//     name: 'Mastra',
//     level: 'info',
//   }),
// });


// import { Mastra } from '@mastra/core/mastra';
// import { PinoLogger } from '@mastra/loggers';
// import { PostgresStore } from '@mastra/pg';
// import { weatherWorkflow } from './workflows/weather-workflow';
// import { weatherAgent } from './agents/weather-agent';

// export const mastra = new Mastra({
//   workflows: { weatherWorkflow },
//   agents: { weatherAgent },
//   storage: new PostgresStore({
//     connectionString: process.env.DATABASE_URL!, // stored in .env
//   }),
//   logger: new PinoLogger({
//     name: 'Mastra',
//     level: 'info',
//   }),
// });
