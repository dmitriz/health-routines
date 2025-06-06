import pytest

# Assume the module and function exist. Replace with actual import later.
# from your_module_path import triage_message

# Placeholder for the actual triage_message function
def triage_message(message: str):
    if "bug" in message and "urgent" in message:
        return {
            "type": "bug",
            "priority": "now",
            "status": "open",
            "needs_clarification": False
        }
    elif "feature" in message:
        return {
            "type": "feature",
            "priority": "soon",
            "status": "open",
            "needs_clarification": False
        }
    elif "help" in message:
        return {
            "type": "question",
            "priority": "later",
            "status": "open",
            "needs_clarification": True
        }
    else:
        return {
            "type": "question",
            "priority": "later",
            "status": "open",
            "needs_clarification": True
        }

def test_triage_bug_report():
    message = "I found a bug in the system. It's quite urgent."
    expected_output = {
        "type": "bug",
        "priority": "now",
        "status": "open",
        "needs_clarification": False
    }
    assert triage_message(message) == expected_output

def test_triage_feature_request():
    message = "It would be great to have a new feature for X."
    expected_output = {
        "type": "feature",
        "priority": "soon",
        "status": "open",
        "needs_clarification": False
    }
    assert triage_message(message) == expected_output

def test_triage_question_needs_clarification():
    message = "I need some help with setting up the project."
    expected_output = {
        "type": "question",
        "priority": "later",
        "status": "open",
        "needs_clarification": True
    }
    assert triage_message(message) == expected_output

def test_triage_vague_message():
    message = "The system is not working."
    expected_output = {
        "type": "question",
        "priority": "later",
        "status": "open",
        "needs_clarification": True
    }
    assert triage_message(message) == expected_output
