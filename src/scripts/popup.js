function createToast(messagekey, time, type)
{
    Materialize.toast(chrome.i18n.getMessage(messagekey), time, type);
}

async function saveData()
{
    const shoeSize = document.getElementById("shoe_size").value;
    const enable = document.getElementById("enable").checked;
    try
    {
        var options = set(
        {
            options:
            {
                enable: enable,
                size: shoeSize
            }
        });
        console.info("Successfully saved data");
        createToast('sucessSave', 1000, 'light-green');
    }
    catch (e)
    {
        console.warn("There was an error saving the data: ", e);
        createToast('errorSave', 1000, 'red');
    }
}
async function init()
{
    try
    {
        var options = await getData();
        var context = {
            title: chrome.i18n.getMessage("appName"),
            off: chrome.i18n.getMessage("off"),
            on: chrome.i18n.getMessage("on"),
            submit: chrome.i18n.getMessage("submit"),
            form:
            {
                shoeSize: chrome.i18n.getMessage("shoeSize"),
                enable: chrome.i18n.getMessage("enable")
            },
            size: options.size
        };
        var source = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(source);
        var html = template(context);
        var target = document.getElementById("body");
        target.innerHTML = html;
        if (options.enable)
        {
            document.getElementById("enable").setAttribute("checked", "")
        }
        document.getElementById("submit").addEventListener('click', saveData);
        $('#shoe_size').val(options.size).trigger('contentChanged');
        $('select').material_select();
    }
    catch (e)
    {
        console.warn("There was an error getting the data: ", e);
        createToast('errorGetData', 1000, 'red');
    }
}
init();