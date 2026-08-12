import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API Proxy Endpoint
  app.post('/api/gemini/consult', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY не установлен. Пожалуйста, укажите его в настройках.',
        });
      }

      const { prompt, context } = req.body;
      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `Вы — эксперт по медицинским информационным системам (МИС), архитектуре здравоохранения и партисипативной медицине.
Вы даете академически строгие, компетентные и глубокие ответы на основе представленного текста концепции:
- Разворот ИТ-архитектуры: от организации и региона к Пациенту (МИС Пациента)
- 8 элементов архитектуры МИС Пациента (6.1.1 - 6.1.8)
- Ключевое ядро: 6.1.2 (Единый лист назначений), 6.1.3 (Наглядная визуализация), 6.1.4 (Персональный ассистент)
- Федеративное обучение моделей (6.2): Уровень Организации -> Уровень Региона -> Уровень Пациента («Данные не покидают контур — передвигаются только веса»)
- Право пациента на данные и гранулярный контроль доступа (6.3)
Отвечайте на русском языке, профессиональным языком научных публикаций и медицинского ИТ.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nКонтекст: ${context || ''}\n\nВопрос/Запрос: ${prompt}` }] }
        ],
      });

      const reply = response.text || 'Нет ответа от модели';
      res.json({ reply });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: error?.message || 'Ошибка обработки запроса AI' });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
