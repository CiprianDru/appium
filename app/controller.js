// Appium webserver controller methods
// https://github.com/hugs/appium/blob/master/appium/server.py
"use strict";

exports.getStatus = function(req, res) {
  // Build a JSON object to return to the client
  var status = {
    sessionId: req.appium.sessionId || null
    , status: 0
    , value: {
        build: {
          version: 'Appium 1.0'
        }
      }
  };
  res.send(status);
};

exports.createSession = function(req, res) {
  // we can talk to the device client from here
  req.appium.start(function(err, instance) {
    if (err) {
      // of course we need to deal with err according to the WDJP spec.
      throw err;
    }

    res.redirect("/wd/hub/session/" + req.appium.sessionId);
  });
};

exports.getSession = function(req, res) {
  var sessionId = req.params.sessionId;
  var appResponse = {
    sessionId: sessionId
    , status: 0
    , value: req.device.capabilities
  };

  res.send(appResponse);
};

exports.getSessions = function(req, res) {
  res.send([{
    id: req.appium.sessionId
    , capabilities: req.device.capabilities
  }]);
};

exports.deleteSession = function(req, res) {
  var sessionId = req.params.sessionId;
  req.appium.stop(function(err, instance) {
    var appResponse = {
      sessionId: sessionId
      , status: 0
      , value: {}
    };

    res.send(appResponse);
  });
};

exports.findElements = function(req, res) {
  var strategy = req.body.using
    , value = req.body.value;

  req.device.findElements(value, function(err, result) {
    res.send({
      sessionId: req.appium.sessionId
      , status: 0
      , value: result
    });
  });
};

exports.setValue = function(req, res) {
  var sessionId = req.params.sessionid
    , elementId = req.params.elementId
    , value = req.body.value.join('')
    , status = 0;

  req.device.setValue(elementId, value, function(err, result) {
    res.send({
      sessionId: req.appium.sessionId
        , status: status
        , value: ''
    });
  });
};

exports.doClick = function(req, res) {
  var sessionid = req.params.sessionid
    , elementId = req.params.elementId
    , status = 0;

  req.device.click(elementId, function(err, json) {
    res.send({
      sessionId: req.appium.sessionId
        , status: status
        , value: ''
    });
  });
};

exports.getText = function(req, res) {
  var sessionid = req.params.sessionid
    , elementId = req.params.elementId
    , status = 0;

  req.device.getText(elementId, function(err, result) {
    res.send({
      sessionId: req.appium.sessionId
        , status: status
        , value: result.toString()
    });
  });
};

exports.keys = function(req, res) {
  var sessionid = req.params.sessionid
    , elementId = req.params.elementId
    , keys = req.body.value.join('')
    , status = 0;

  req.device.keys(elementId, keys, function(err, json) {
    res.send({
      sessionId: req.appium.sessionId
        , status: status
        , value: ''
    });
  });
};

exports.elementDisplayed = function(req, res) {
  var sessionid = req.params.sessionid
    , elementId = req.params.elementId
    , status = 0;

  req.device.elementDisplayed(elementId, function(err, result) {
    res.send({
      sessionId: req.appium.sessionId
        , status: status
        , value: result
    });
  });
};

exports.elementEnabled = function(req, res) {
  var sessionid = req.params.sessionid
    , elementId = req.params.elementId
    , status = 0;

  req.device.elementEnabled(elementId, function(err, result) {
    res.send({
      sessionId: req.appium.sessionId
        , status: status
        , value: result
    });
  });
};

exports.getPageSource = function(req, res) {
  var sessionid = req.params.sessionid
    , status = 0;

  req.device.getPageSource(function(err, result) {
    res.send({
      sessionId: req.appium.sessionId
        , status: status
        , value: result
    });
  });
};

exports.getAlertText = function(req, res) {
  var sessionid = req.params.sessionid
    , status = 0;

  req.device.getAlertText(function(err, result) {
    res.send({
      sessionId: req.appium.sessionId
        , status: status
        , value: result
    });
  });
};

exports.postAcceptAlert = function(req, res) {
  var sessionid = req.params.sessionid
    , status = 0;

  req.device.postAcceptAlert(function(err, result) {
    res.send({
      sessionId: req.appium.sessionId
        , status: status
        , value: result
    });
  });
};

exports.postDismissAlert = function(req, res) {
  var sessionid = req.params.sessionid
    , status = 0;

  req.device.postDismissAlert(function(err, result) {
    res.send({
      sessionId: req.appium.sessionId
        , status: status
        , value: result
    });
  });
};

exports.implicitWait = function(req, res) {
  var seconds = req.body.ms / 1000;

  req.device.implicitWait(seconds, function(err, result) {
    res.send({
      sessionId: req.appium.sessionId
      , status: (err === null)? 0 : 13
    });
  });
};
