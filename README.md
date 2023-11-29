# VigilAI - Winner of AI ATL Hackathon
**1st Place The Home Depot: Securing and Validating Large Language Models
2nd Place BCG X: Business Innovation**


## Inspiration

Over the past decade, a growing sense of mistrust has emerged between the general American public and local law enforcement. VigilAI was created to bridge this gap by leveraging data-driven machine learning to identify deviations between police actions and established protocols. Our goal is to enhance trust, reinforce accountability, and promote better training practices among officers.

## What it does

VigilAI analyzes bodycam footage and provides the following insights:

- **Personalized Dashboard:** Officers and station managers can access a personalized dashboard displaying incident reports generated from bodycam analysis.

- **Protocol Deviation Analysis:** Identifies the magnitude of difference between officers' on-duty actions and mandated protocol, fostering accountability.

- **Toggle Instances with Auto-generated Captions:** Enables police station personnel to toggle instances in bodycam footage where officers deviated from protocol, providing auto-generated captions and AI-generated incident summaries.

- **Training Quiz Generation:** Generates a training quiz for officers based on their actions captured on bodycam footage, allowing for continuous improvement.

## How we built it

VigilAI was developed using multi-layered machine learning approaches to achieve a scalable and accurate model that prioritizes fairness and efficiency. Here's an overview of our methodology:

1. **Speech Diarization and Similarity AI:**
   - Spliced mp4 bodycam footage using Google Cloud's speech analysis model to separate officer speech from suspects and radio interactions.
   - Utilized an optimized Language Model (LLM) to identify suspects from the officer using a purely audio-based approach and generated detailed transcripts.

2. **Visual Analysis of Bodycam Footage:**
   - Analyzed bodycam footage with Google Cloud's Video Intelligence model to provide annotations of visual stimuli.
   - Utilized a Sentiment Analysis model from Huggingface to categorize autogenerated descriptions of bodycam footage.

3. **Multimodal LLM:**
   - Combined data from speech and visual analysis to create a detailed AI-generated description of an officer's deviations from protocol with associated timestamps, justifications, and relevant laws.

4. **Auto-Generated Training Quiz:**
   - Employed a fine-tuned LLM to generate personalized training quizzes for officers based on their on-duty actions, allowing station managers to track performance over time.

## Challenges we ran into

- Time complexity of speech analysis and multimodal algorithm for large data files.
- Audio compatibility issues with Google Cloud models.
- Hardware-specific module challenges.

## Accomplishments that we're proud of

Creating a product that empowers officers to improve their awareness during situations and provide better assistance to the general public.

## What we learned

- Fine-tuning LLM models.
- Splicing and optimizing audio files for cloud-based computation.

## What's next for VigilAI

- Improving processing speed for analyzing larger data files more quickly.
- Implementing a live analysis feature for station-based monitoring.
