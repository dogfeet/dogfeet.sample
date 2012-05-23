#!/usr/bin/env python

# Echo client program
import socket
import sys
import time
import re

def tryToConnect( argv ):
    ip=argv[0]
    port=int(argv[1])

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM )

    try:
        sock.connect( (ip, port) )
    except:
        print ip, port

    sock.close()

if __name__ == '__main__':

    stime=time.time()

    file = open(sys.argv[1])

    jobs = []

    while True:
        line = file.readline()

        if not line:
            break

        opts = re.split('\s*', line)

        if len(opts) > 2:
            job = tryToConnect( opts )
            jobs.append( job )
        else:
            print opts[0]

    file.close()

    etime=time.time()

    print 'elapsed %f' % (etime - stime)

