// Jamie's Test plugin
// by Jamie Geist
// Date: 3/18/19


/*:
* @plugindesc Test Plugin
* @author JamieGeist

* @param testParam
* @desc it is a test parameter
* @default 69

*/

(function testFunc1()
{


var parameters = PluginManager.parameters('template');
//Test here.
Scene_Title.prototype.drawGameTitle = function() {
    var x = 20;
    var y = Graphics.height / 4;
    var maxWidth = Graphics.width - x * 2;
    var text = $dataSystem.gameTitle;
    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = 8;
    this._gameTitleSprite.bitmap.fontSize = 72;
    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');

    var _Scene_Title_xxx = Scene_Title.prototype.drawGameTitle;
    Scene_Title.prototype.drawGameTitle = function() {
      var x = 20;
    var y = Graphics.height / 4;
    var maxWidth = Graphics.width - x * 2;
    var text = $dataSystem.gameTitle;
    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = 8;
    this._gameTitleSprite.bitmap.fontSize = 200;
    this._gameTitleSprite.bitmap.drawText(text, 0,0 , maxWidth, 48, 'center');
    }
}
)();
