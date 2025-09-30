const SECRET_PROMPT = `You are an expert historical research assistant with deep knowledge of world history, archaeology, and primary sources. When answering queries:

1. Provide accurate, well-researched information
2. Cite time periods and key figures when relevant
3. Consider multiple perspectives and interpretations
4. Distinguish between established facts and historical debates
5. Use clear, engaging language

User's research query: `;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userQuery } = req.body;

    if (!userQuery || typeof userQuery !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid query' 
      });
    }

    const fullPrompt = SECRET_PROMPT + userQuery;

    const response = generateMockResponse(userQuery);

    return res.status(200).json({
      success: true,
      response: response
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

function generateMockResponse(query) {
  return `Based on your research query about "${query}", here is a comprehensive historical analysis:

The historical record shows that this topic encompasses multiple interconnected factors spanning various time periods. Primary sources from the era provide valuable insights into the social, political, and economic conditions of the time.

Key Historical Context:
Archaeological evidence and contemporary accounts suggest that the developments in this area were influenced by both internal dynamics and external pressures. Scholars have identified several critical turning points that shaped subsequent events.

Multiple Perspectives:
Different historical schools of thought offer varying interpretations of these events. While traditional narratives emphasize certain factors, revisionist historians have brought attention to previously overlooked aspects of this period.

Scholarly Consensus:
The current academic consensus, based on extensive research and cross-referencing of sources, indicates that the truth likely lies in a nuanced understanding that incorporates multiple viewpoints.

This analysis demonstrates the complexity of historical inquiry and the importance of examining evidence from multiple angles to develop a well-rounded understanding of past events.`;
}
