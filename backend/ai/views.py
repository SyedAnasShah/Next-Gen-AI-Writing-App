import openai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import nltk
from nltk.corpus import wordnet

# Ensure NLTK data is downloaded (run this once in your environment)
# nltk.download('wordnet')
# nltk.download('omw-1.4')  # For multilingual WordNet support

# Set your OpenAI API key
openai.api_key = 'YOUR_OPENAI_API_KEY'

# Utility function for calling OpenAI API
def call_openai(prompt, max_tokens=500):
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=max_tokens
        )
        return response.choices[0].text.strip()
    except openai.error.OpenAIError as e:
        return str(e)  # Handle API errors gracefully

def analyze_word(word):
    """
    Analyzes a word using NLTK's WordNet.
    Provides definitions, examples, and synonyms.
    """
    synsets = wordnet.synsets(word)
    if not synsets:
        return {"word": word, "error": "No information found in WordNet"}
    
    analysis = []
    for syn in synsets:
        analysis.append({
            "definition": syn.definition(),
            "examples": syn.examples(),
            "synonyms": [lemma.name() for lemma in syn.lemmas()]
        })
    return {"word": word, "analysis": analysis}

@csrf_exempt
def check_grammar(request):
    """
    View to check grammar and provide suggestions for improvement.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            text = data.get('text', '').strip()
            if not text:
                return JsonResponse({"error": "Text cannot be empty"}, status=400)

            prompt = f"Check the grammar of the following text and provide suggestions: {text}"
            suggestions = call_openai(prompt)

            return JsonResponse({"text": text, "suggestions": suggestions}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def recommend_content(request):
    """
    View to recommend content ideas for a given topic.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            topic = data.get('topic', '').strip()
            if not topic:
                return JsonResponse({"error": "Topic cannot be empty"}, status=400)

            prompt = f"Recommend content ideas for the following topic: {topic}"
            recommendations = call_openai(prompt)

            return JsonResponse({"topic": topic, "recommendations": recommendations}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def word_analysis(request):
    """
    View to analyze a word using NLTK's WordNet.
    Provides definitions, contextual examples, and synonyms.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            word = data.get('word', '').strip()
            if not word:
                return JsonResponse({"error": "Word cannot be empty"}, status=400)

            # Perform word analysis using NLTK
            word_info = analyze_word(word)

            return JsonResponse(word_info, status=200)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)
