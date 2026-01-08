def generate_message(improvement, consistency):
    if improvement > 10:
        return {
            "message": "Your accuracy improved significantly this week. Keep going \U0001F4AA",
            "reason": "You showed >10% improvement in mock tests."
        }
    if consistency >= 4:
        return {
            "message": "Consistency matters more than speed. You're doing well.",
            "reason": "You have logged in for 4+ consecutive days."
        }
    return {
        "message": "One missed goal doesn\u2019t break progress. You\u2019re still on track.",
        "reason": "Setback recovery is key to resilience."
    }
