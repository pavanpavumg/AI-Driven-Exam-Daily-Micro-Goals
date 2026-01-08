def calculate_confidence(consistency, improvement, effort, mistake_reduction):
    score = (
        0.4 * consistency +
        0.3 * improvement +
        0.2 * effort +
        0.1 * mistake_reduction
    )
    return min(max(round(score, 2), 0), 100)
