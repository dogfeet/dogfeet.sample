#!/usr/bin/env python

import subprocess
import sys
import re

if len(sys.argv) != 3:
    print "usage: {0} [old] [new]".format(sys.argv[0])
    exit(0)

def isText(path):
    return (re.search(r':.* text',
        subprocess.Popen(["file", '-L', path],
            stdout=subprocess.PIPE).stdout.read())
            is not None)

def lineByLine(file, func):
    while True:
        lines = file.readlines(1000)
        if not lines:
            break
        for line in lines:
            func( line );

ret=''

def regrep(old, new):
    p = subprocess.Popen("grep -lR " + old + " * ", shell=True, stdout=subprocess.PIPE)

    def replaceAFile(filename):
        filename = filename.strip()
        global ret
        ret = ''

        def replaceALine(line):
            global ret
            ret += line.replace(old, new)

        if isText( filename ):
            #try:
            rfile = open( filename )

            lineByLine(rfile, replaceALine)

            #except:
            #    print "error: {0}".format( filename )
            #finally:
            rfile.close()

            wfile = open( filename, 'w' )
            wfile.write( ret )
            wfile.close()

    lineByLine(p.stdout, replaceAFile)


regrep(sys.argv[1].strip(), sys.argv[2].strip())

