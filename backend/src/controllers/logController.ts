import { OpenAI } from 'openai'
import { Request, Response } from 'express'
import db from '../config/prisma'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const consultAndLog = async (req: Request, res: Response) => {
  const question = req.query.question as string

  if (!question) {
    return res.json({ error: 'Pergunta não fornecida' })
  }

  // Decodifica a question vinda da query string
  const decodedQuestion = decodeURIComponent(question)

  try {
    // Requisição à API do ChatGPT
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: decodedQuestion }, {role: 'system', content: "You are a videogame expert."}],
      temperature: 0.7,
      max_tokens: 200,
      top_p: 1,
      stop: ['\n']
    })

    const answer = response.choices[0]?.message?.content

    if (!answer) {
      return res.json({ error: 'Resposta inválida da API do ChatGPT' })
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
    console.error('Erro ao consultar API do ChatGPT:', error)
    return res.json({
      error: 'Erro ao consultar API do ChatGPT',
      details: error.message,
    })
  }
}
