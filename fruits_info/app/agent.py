from groq import Groq
from .config import settings


def health_benefits(fruit):
        client = Groq(api_key=settings.groq_key)
        prompt = f"I am very curious to know some health benefits of fruits, so give me an example using {fruit}"
    
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                # {
                #     "role": "system",
                #     "content": "JSON"
                # },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=1,
            max_tokens=150,
        )

        benefits = response.choices[0].message.content
        return benefits




