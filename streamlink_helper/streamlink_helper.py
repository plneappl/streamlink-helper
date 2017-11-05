#!/usr/bin/env python 

import sys
import json
import struct
import subprocess
import platform

def launchStreamlink(url):
  message = platform.system() + "\n"
  for p in sys.path:
    message += "\t" + p + "\n"
  try:
    if platform.system() == 'Windows':
    # https://msdn.microsoft.com/en-us/library/windows/desktop/ms684863(v=vs.85).aspx
      p = subprocess.Popen(['streamlink.exe', url], creationflags = 0x01000000 | subprocess.CREATE_NEW_CONSOLE)
    else:
      # if streamlink is not found, you can propably fix it by uncommenting and editing the following line:
      # p = subprocess.Popen(['/home/<USER>/.local/bin/streamlink', url], stdout = subprocess.PIPE)
      # and commenting out this one:
      p = subprocess.Popen(['streamlink', url], stdout = subprocess.PIPE)
    p.wait()
    # clear debug messages, comment out if you're troubleshooting
    message = ""
  except (Error, Exception) as e:
    message += type(e) + "\n"
    message += e.args + "\n"
    message += e + "\n"
  finally:
    return message

def main():
  while True:
    message = ""
    try:
      url = getMessage()
      message += launchStreamlink(url) + "\n"
      message += "done"
    except (Error, Exception) as e:
      message += type(e) + "\n"
      message += e.args + "\n"
      message += e + "\n"
    finally:
      sendMessage(encodeMessage(message))

try:
    # Python 3.x version
    # Read a message from stdin and decode it.
    def getMessage():
        rawLength = sys.stdin.buffer.read(4)
        if len(rawLength) == 0:
            sys.exit(0)
        messageLength = struct.unpack('@I', rawLength)[0]
        message = sys.stdin.buffer.read(messageLength).decode('utf-8')
        return json.loads(message)

    # Encode a message for transmission,
    # given its content.
    def encodeMessage(messageContent):
        encodedContent = json.dumps(messageContent).encode('utf-8')
        encodedLength = struct.pack('@I', len(encodedContent))
        return {'length': encodedLength, 'content': encodedContent}

    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.buffer.write(encodedMessage['length'])
        sys.stdout.buffer.write(encodedMessage['content'])
        sys.stdout.buffer.flush()

    main()
    
    
    
except AttributeError:
    # Python 2.x version (if sys.stdin.buffer is not defined)
    # Read a message from stdin and decode it.
    def getMessage():
        rawLength = sys.stdin.read(4)
        if len(rawLength) == 0:
            sys.exit(0)
        messageLength = struct.unpack('@I', rawLength)[0]
        message = sys.stdin.read(messageLength)
        return json.loads(message)

    # Encode a message for transmission,
    # given its content.
    def encodeMessage(messageContent):
        encodedContent = json.dumps(messageContent)
        encodedLength = struct.pack('@I', len(encodedContent))
        return {'length': encodedLength, 'content': encodedContent}

    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.write(encodedMessage['length'])
        sys.stdout.write(encodedMessage['content'])
        sys.stdout.flush()

    main()
    