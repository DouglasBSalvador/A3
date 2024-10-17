import { Request, Response } from 'express'
import db from '../config/prisma'


export const consultAndLog = async (req: Request, res: Response) => {
  const question = req.query.question as string

  if (!question) {
    return res.json({ error: 'Pergunta não fornecida' })
  }

  // Decodifica a question vinda da query string
  const decodedQuestion = decodeURIComponent(question)

  try {
    const answer = 'Teste'

    if (!answer) {
      return res.json({ error: 'Resposta inválida da API' })
    }

    // Salvar log no banco de dados
    const newLog = await db.log.create({
      data: {
        question: decodedQuestion,
        answer,
      },
    })

    // Retornar o log criado e a resposta da API
    return res.json({ log: newLog, answer })
  } catch (error: any) {
    console.error('Erro ao consultar API', error)
    return res.json({
      error: 'Erro ao consultar API',
      details: error.message,
    })
  }
}
