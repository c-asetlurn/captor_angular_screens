/**Global Function For TinyMCE Character Count**/
function handleTinyMCE(tinymce_id, tinymce_selector, tinymce_character_count, maximum_limit) {
    var max_chars = maximum_limit; //max characters
    var max_for_html = 300; //max characters for html tags
    var allowed_keys = [16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 46];
    var chars_without_html, chars_with_html = 0;
    var tinymce_variable = tinymce_id;
    var bypass_character_count = 0;
    var initial_load_tinymce = 0;
    $(function () {

        tinymce.init({
            selector: tinymce_selector,
            //forced_root_block : "",
            theme: "modern",
            skin: 'captor',
            plugins: 'wordcount link powerpaste autoresize autolink',
            default_link_target: "_blank",
            extended_valid_elements : "a[href|target=_blank]",
            oninit: "setPlainText",
            paste_as_text: true,
            spellchecker_rpc_url: 'http://crtec0089169.cr.lcl:8080/ephox-spelling',
            spellchecker_language: 'en',
            autoresize_min_height: 150,
            autoresize_max_height: 150,
            powerpaste_word_import: 'clean',
            powerpaste_html_import: 'merge',
            wordcount_cleanregex: /[0-9.(),;:!?%#$?\x27\x22_+=\\/\-]*/g,
            browser_spellcheck: true,
            menubar: false,
            content_css: [
              RootURI + '/Content/css/apps-googlefont.min.css',
              RootURI + '/Content/css/tinymce.min.css'
            ],
            setup: function (ed) {
                ed.on('KeyUp KeyDown LoadContent KeyPress Change NodeChange MouseOver', function (ed, e) {
                    var count = CountCharacters(tinymce_variable);
                    var key = ed.keyCode;
                    
                    if ((key == 8) || (key == 46) || (key == 88) || (key == 67)) {
                        bypass_character_count = 0;
                    } else if ((key != 8) && (key != 46) && (key != 88) && (key != 67) && ((count == max_chars))) {
                        ed.stopPropagation();
                        ed.preventDefault();
                        $(tinymce_character_count).html(0 + " of " + max_chars + " characters remaining");
                        bypass_character_count = 1;
                    } else if (count > max_chars) {
                        ed.stopPropagation();
                        ed.preventDefault();
                        var body = tinymce.get(tinymce_variable).getBody();
                        var content = tinymce.trim(body.innerText || body.textContent);
                        if (initial_load_tinymce == 0) {
                            content = content.slice(0, (max_chars + 100));
                            initial_load_tinymce = 1;
                        } else {
                            content = content.slice(0, max_chars);
                        }
                        var content_length = content.length;
                        tinyMCE.get(tinymce_variable).setContent(content);
                        $(tinymce_character_count).html(0 + " of " + max_chars + " characters remaining");
                        $(tinymce_character_count).css('color', '#AB2B3B'); //danger color
                    } else if (count < max_chars) {
                        bypass_character_count = 0;
                        $(tinymce_character_count).html(max_chars - count + " of " + max_chars + " characters remaining");
                    }
                    if ((max_chars - count) >= 0) {
                        $(tinymce_character_count).html(max_chars - count + " of " + max_chars + " characters remaining");
                    }
                        if ((count > (max_chars - 5))) {
                            $(tinymce_character_count).css('color', '#AB2B3B'); //danger color
                        }
                        else if ((count > (max_chars - 6))) {
                            $(tinymce_character_count).css('color', '#AB2B3B'); //danger color
                        }
                        else if ((count > (max_chars - 25))) {
                            $(tinymce_character_count).css('color', '#F8971D'); //warning color
                        }
                        else if ((count > (max_chars - 26))) {
                            $(tinymce_character_count).css('color', '#F8971D'); //warning color
                        } else {
                            $(tinymce_character_count).css('color', '#bbbbbb'); //normal color
                        }
                    if (bypass_character_count == 1) {
                        $(tinymce_character_count).html(0 + " of " + max_chars + " characters remaining");
                        ed.stopPropagation();
                        ed.preventDefault();
                    }

                });
            },
            toolbar: "bold italic underline link",
            default_link_target: "_blank",
            link_assume_external_targets: true,
            style_formats: [
                { title: 'Bold text', inline: 'b' },
                { title: 'Example 1', inline: 'span', classes: 'example1' },
                { title: 'Example 2', inline: 'span', classes: 'example2' },
                { title: 'Table styles' },
                { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' }
            ],
            link_class_list: [{ title: 'Hyperlink', value: 'tinymce-hyperlink' }]
        });

    });
    function CountCharacters(tinymce_variable) {
        if (tinymce.get(tinymce_variable) != null) {
            var body = tinymce.get(tinymce_variable).getBody();
            var content = tinymce.trim(body.innerText || body.textContent);
            return content.length;
        }
        else {
            return 0;
        }
    };
}

function handleTinyMCEDisabled() {
    $(function () {
        tinymce.init({
            selector: ".tinymcedisabled",
            plugins: "autoresize link autolink",
            default_link_target: "_blank",
            extended_valid_elements : "a[href|target=_blank]",
            autoresize_min_height: 150,
            autoresize_max_height: 150,
            theme: "modern",
            skin: 'captor',
            menubar: false,
            readonly: true,
            toolbar: 'false',
            content_css: [
              RootURI + '/Content/css/apps-googlefont.min.css',
              RootURI + '/Content/css/tinymce.min.css'
            ],
            browser_spellcheck: true
        });
    });
}

//This Function Developed For Case Notes to Avoid On Load Issue. Don't Delete it Please
function countTinyMCEonLoad(tinymce_id, tinymce_character_count, maximum_limit) {
    var body = tinymce.get(tinymce_id).getBody();
    var content = tinymce.trim(body.innerText || body.textContent);
    var content_length = content.length;
    $(tinymce_character_count).html(maximum_limit - content_length + " of " + maximum_limit + " characters remaining");
    if ((content > (maximum_limit - 5))) {
        $(tinymce_character_count).css('color', '#AB2B3B'); //danger color
    }
    else if ((content > (maximum_limit - 6))) {
        $(tinymce_character_count).css('color', '#AB2B3B'); //danger color
    }
    else if ((content > (maximum_limit - 25))) {
        $(tinymce_character_count).css('color', '#F8971D'); //warning color
    }
    else if ((content > (maximum_limit - 26))) {
        $(tinymce_character_count).css('color', '#F8971D'); //warning color
    } else {
        $(tinymce_character_count).css('color', '#bbbbbb'); //normal color
    }
}

