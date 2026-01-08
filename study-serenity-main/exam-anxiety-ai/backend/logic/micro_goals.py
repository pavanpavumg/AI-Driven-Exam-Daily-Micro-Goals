import random

def generate_micro_goals(weak_topics):
    templates = [
        "Revise formulas of {topic} (20 mins)",
        "Solve 5 medium questions from {topic} \u2014 no time pressure",
        "Review mistakes from {topic} (15 mins)"
    ]

    goals = []
    # Safeguard against empty weak_topics or sample size being larger than population
    # Ensure 2-4 goals
    count = min(max(2, len(weak_topics)), 4)
    # If not enough topics, duplicate some templates creatively or just pick from available topics
    sample_topics = weak_topics * 3 
    
    selected_topics = random.sample(sample_topics, count)
    for topic in selected_topics:
        # Avoid duplicate exact strings if possible, but for now simple format is fine
        goals.append(random.choice(templates).format(topic=topic))
    
    # Deduplicate goals
    goals = list(set(goals))
    
    # Ensure at least 2 goals if possible
    while len(goals) < 2 and len(weak_topics) > 0:
         goals.append(random.choice(templates).format(topic=random.choice(weak_topics)))
         goals = list(set(goals))
    
    return goals
