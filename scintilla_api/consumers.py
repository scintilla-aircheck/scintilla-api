from django.http import HttpResponse
from channels.handler import AsgiHandler
from channels import Group


def http_request(message):
    import sys
    print("TEST HTTP REQUEST", file=sys.stderr)
    response = HttpResponse("Hello world from a consumer!")
    for chunk in AsgiHandler.encode_response(response):
        message.reply_channel.send(chunk)


def ws_connect(msg):
    import sys
    print("TEST CONNECT", file=sys.stderr)
    Group('custom_broadcast').add(msg.reply_channel)

    Group('readings').add(msg.reply_channel)


def ws_disconnect(msg):
    Group('custom_broadcast').discard(msg.reply_channel)

    Group('readings').discard(msg.reply_channel)


def ws_receive(msg):
    import sys
    print("TEST RECEIVE", file=sys.stderr)
    Group('custom_broadcast').send({
        'text': msg.content['text']
    })
