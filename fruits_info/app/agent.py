from groq import Groq
from os.path import abspath, dirname, join
import environ


env = environ.Env()
environ.Env.read_env(join(dirname(dirname(dirname(abspath(__file__)))), '.env'))
api_key = env('GROQ_KEY')

def health_benefits(fruit):
        client = Groq(api_key=api_key)
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
            max_tokens=100,
        )

        benefits = response.choices[0].message.content
        return benefits