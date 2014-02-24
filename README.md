overlap-graph-demo
==================

An [Overlap Graph exercise](http://rosalind.info/problems/grph/) implemented in AngularJS.

What it does:

- You enter any number of nodes having a label and a sequence of characters.
- The app will render a table representing overlap relationships in the collection. 
- You may change the length of the overlap to be computed, default is 3.

Pending stuff:

- Unit tests for `GraphController` and `NodeEntryController`
- d3 "[directed graph](http://bl.ocks.org/mbostock/4062045)" visualization

## Setup

You first need to download and install the dependencies, by typing:

`$ npm install && bower install`

(assuming you are on a Linux environment).

## Usage

You need [Gulp](http://gulpjs.com/) to build and run the app in a local server. To install it, do a

`$ npm install -g gulp`

Then just run

`$ gulp`

and then point your browser to `http://localhost:3000`
