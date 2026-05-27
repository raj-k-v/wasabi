from app.graph.nodes import analyze_signals, generate_alerts, search_web
from app.graph.state import IntelligenceGraphState


def build_workflow() -> list:
    # TODO: Replace this placeholder with a LangGraph workflow definition.
    return [search_web, analyze_signals, generate_alerts]
