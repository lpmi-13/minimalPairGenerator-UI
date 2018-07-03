$(function() {
    
    var directoryData = {};

    function addDirectoryButton(directory, example) {
      return '<button class="directory btn btn-primary btn-lg" name="' + directory + '">' + directory +  '<br>' + example + '</button>';
    }

    function addSubDirectoryButtons(phonemes, subdirectory) {
      return '<button class="subdirectory btn btn-secondary btn-lg" name="' + phonemes + '/' + subdirectory + '">' + subdirectory + '</button>';
    }

    function addButtons(objectArrayItem) {

      var smallButtons = '';
      var phonemes = objectArrayItem.node;

      $.each(objectArrayItem.pairs, function(pair) {
         smallButtons += addSubDirectoryButtons(phonemes, objectArrayItem.pairs[pair]);
      });

      return '<div>' +
               '<div class="row">' +
                 '<div class="col-xs-12">' +
                   addDirectoryButton(objectArrayItem.node, objectArrayItem.pairs[0]) +
                 '</div>' +
               '</div>' +
               '<div class="smallButtons row">'+
                 '<div class="col-xs-12">' +
                   smallButtons +
                 '</div>' +
               '</div>' +
             '</div>';
    }

    function renderAudioElement(path, pair) {

      var jsonPath = '/static/data/' + path + '/' + pair + '.json'
      var pairArray = pair.split('-');

      function showWord(path) {
        $.getJSON(path, function(data) {

          var totalTimeout = data.sprite.length;

          var spriteData = data.sprite;

          var wordArray = spriteData.map(function(word){
            var justWord = word.name;
            var lastWord = justWord.lastIndexOf("_");
            return justWord.slice(lastWord + 1);
          });

          var index = 1;

          function wordLoop(iterations, objectArray) {
            setTimeout(function() {
              growAndShrink(objectArray, index);
              index++;
              if (index < iterations) {
                wordLoop(iterations, objectArray);
              }
            }, 2000)
          };

          function growAndShrink(objectArray, i) {
            $('#pron-' + objectArray[i] + '')
              .animate({
                'font-size': '+=2em'
              }, 800, function() {
                $(this).animate({
                  'font-size': '-=2em'
                }, 800);                  
              });
          };
           
          growAndShrink(wordArray, 0); 
          wordLoop(totalTimeout, wordArray)

        });
      }

      return '<audio controls onclick=' + showWord(jsonPath) + ' id="active" disabled autoplay>' +
               '<source src="/static/data/' + path + '/' + pair + '.m4a" type="audio/mp4">' +
             '</audio>' +
              '<div class="readTheWords">' +
                '<div class="left" id="pron-' + pairArray[0] + '">' +
                pairArray[0] + '</div>' +
                '<div class="right" id="pron-' + pairArray[1] + '">' +
                pairArray[1] + '</div>' +
              '</div>';
    }

    $.getJSON('/static/js/directory.json', function(data){

      DOMArray = [];

      $.each(data, function(item) {
        DOMArray.push(
          {
            'node' : item,
            'pairs' : data[item].words
          } 
        );
      });

      buttonArray = [];

      $.each(DOMArray, function(item) {
        buttonArray.push(addButtons(DOMArray[item]));
      });

      $('.directoryButtons').append(buttonArray);

      $('.smallButtons').on('click', 'button', function() {

        $('#active').remove();
        $('.readTheWords').remove();

        var soundElement = event.target;

        var soundPath = soundElement.name;
        var fileName = soundElement.innerHTML;

        $(this).after(renderAudioElement(soundPath, fileName));
      });
    
      $('.directoryButtons').on('click', 'button', function() {
        if ($(this).hasClass('btn-primary')) {
          var el = $(this).parent().parent();
          $('.smallButtons').hide();
          $(el).next('.smallButtons').slideToggle();
        };
      });
    });
    

});
