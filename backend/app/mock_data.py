DASHBOARD = {
    "stats": {
        "monitored_companies": 8,
        "active_alerts": 3,
        "signals_detected": 24,
        "reports_generated": 5,
    },
    "recent_signals": [
        {
            "id": "signal_1",
            "company": "Competitor X",
            "signal_type": "pricing_change",
            "severity": "high",
            "summary": "Competitor reduced pricing by 20%.",
            "confidence": 0.94,
        },
        {
            "id": "signal_2",
            "company": "Competitor Y",
            "signal_type": "hiring_activity",
            "severity": "medium",
            "summary": "New AI engineering roles were posted.",
            "confidence": 0.87,
        },
    ],
    "recent_activity": [
        {
            "id": "activity_1",
            "message": "Pricing monitor completed for Competitor X.",
            "created_at": "2026-05-27T12:30:00Z",
        },
        {
            "id": "activity_2",
            "message": "Weekly intelligence report generated.",
            "created_at": "2026-05-27T12:10:00Z",
        },
    ],
}

ALERTS = [
    {
        "id": "alert_1",
        "company": "Competitor X",
        "severity": "high",
        "title": "Pricing changed",
        "summary": "Competitor X reduced pricing by 20%.",
        "signal_type": "pricing_change",
        "read": False,
        "created_at": "2026-05-27T12:35:00Z",
    },
    {
        "id": "alert_2",
        "company": "Competitor Y",
        "severity": "medium",
        "title": "Hiring activity detected",
        "summary": "Competitor Y posted new AI engineering roles.",
        "signal_type": "hiring_activity",
        "read": False,
        "created_at": "2026-05-27T11:50:00Z",
    },
    {
        "id": "alert_3",
        "company": "Competitor Z",
        "severity": "low",
        "title": "New content found",
        "summary": "Competitor Z published a new product blog post.",
        "signal_type": "content_update",
        "read": True,
        "created_at": "2026-05-26T18:20:00Z",
    },
]

COMPETITORS = [
    {
        "id": "comp_1",
        "name": "Competitor X",
        "industry": "SaaS",
        "website": "https://example.com",
        "risk_level": "high",
        "signals_count": 12,
        "last_checked_at": "2026-05-27T12:30:00Z",
    },
    {
        "id": "comp_2",
        "name": "Competitor Y",
        "industry": "AI Tools",
        "website": "https://example.org",
        "risk_level": "medium",
        "signals_count": 7,
        "last_checked_at": "2026-05-27T11:45:00Z",
    },
    {
        "id": "comp_3",
        "name": "Competitor Z",
        "industry": "Data Platform",
        "website": "https://example.net",
        "risk_level": "low",
        "signals_count": 4,
        "last_checked_at": "2026-05-26T18:15:00Z",
    },
]

MONITORING_TASKS = [
    {
        "id": "monitor_1",
        "company": "Competitor X",
        "target": "Pricing page",
        "target_url": "https://example.com/pricing",
        "frequency": "daily",
        "status": "active",
        "last_run_at": "2026-05-27T12:30:00Z",
    },
    {
        "id": "monitor_2",
        "company": "Competitor Y",
        "target": "Careers page",
        "target_url": "https://example.org/careers",
        "frequency": "every_12_hours",
        "status": "active",
        "last_run_at": "2026-05-27T11:45:00Z",
    },
    {
        "id": "monitor_3",
        "company": "Competitor Z",
        "target": "Blog",
        "target_url": "https://example.net/blog",
        "frequency": "weekly",
        "status": "paused",
        "last_run_at": "2026-05-26T18:15:00Z",
    },
]

REPORTS = [
    {
        "id": "report_1",
        "title": "Weekly Competitor Intelligence Report",
        "summary": "Pricing, hiring, and content activity were detected across monitored competitors.",
        "signals_count": 8,
        "created_at": "2026-05-27T10:00:00Z",
    },
    {
        "id": "report_2",
        "title": "Pricing Movement Summary",
        "summary": "One high-severity pricing signal was found for Competitor X.",
        "signals_count": 3,
        "created_at": "2026-05-26T17:00:00Z",
    },
]
