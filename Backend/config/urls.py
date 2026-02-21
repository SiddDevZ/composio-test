import os
from django.urls import path
from django.http import JsonResponse
from composio import Composio

def fetch_emails(request):
    try:
        composio = Composio(
            api_key=os.getenv("COMPOSIO_API_KEY"),
            toolkit_versions={"gmail": "20260212_00"}
        )
        result = composio.tools.execute(
            "GMAIL_FETCH_EMAILS",
            user_id=os.getenv("COMPOSIO_USER_ID"),
            arguments={"max_results": 5}
        )
        messages = result.get("data", {}).get("messages", [])
        emails = []
        for msg in messages:
            subject = "(no subject)"
            sender = ""
            for h in msg.get("payload", {}).get("headers", []):
                name = h.get("name", "").lower()
                if name == "subject": subject = h.get("value", "(no subject)")
                elif name == "from": sender = h.get("value", "")
            emails.append({
                "id": msg.get("messageId", ""),
                "sender": sender,
                "subject": subject,
                "snippet": msg.get("messageText", "")[:200],
                "body": msg.get("messageText", ""),
                "date": msg.get("messageTimestamp"),
                "is_read": "UNREAD" not in msg.get("labelIds", [])
            })
        return JsonResponse(emails, safe=False)
    except Exception as e:
        res = JsonResponse({"error": str(e)}, status=500)
        res["Access-Control-Allow-Origin"] = "*"
        return res

urlpatterns = [
    path("emails/", fetch_emails),
]
