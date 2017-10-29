(function()
{
    var url = window.location.href;
    var opts = {};

    async function init()
    {
        await loadOptions();
        if (isUrl('footlocker.com') && opts.enable)
        {
            //selecting shoe
            if (isUrl('footlocker.com/product/model'))
            {
                footLockerAutoADD();
            }
            else if (isUrl("footlocker.com/shoppingcart"))
            {
                footLockercheckout();
            }
        }
    }
    init();
    async function loadOptions()
    {
        opts = await getData();
        opts.PayPal = false;
        return opts;
    }


    function isUrl(subString)
    {
        return url.indexOf(subString) > -1;
    }

    function delay(t)
    {
        return new Promise(function(resolve)
        {
            setTimeout(resolve, t)
        });
    }

    function clickNode(node)
    {
        node.dispatchEvent(new MouseEvent('click'));
    }
    //START FOOTLOCKER AUTOADD//
    function footLockerAutoADD()
    {
        //select size
        clickNode(document.querySelector("a[value=" + "'" + opts.size + "'" + "]"));

        //add to cart
        clickNode(document.querySelector("button[title='Add To Cart']"));

        //wait for pop up to come up view cart and checkout	
        checkForItemOrDelay = async function()
        {

            await delay(1000);
            let node = document.querySelectorAll("#miniAddToCart_actions > div.top_row > a")[1];
            if (node)
            {
                return clickNode(node);
            }
            return checkForItemOrDelay();

        };
        checkForItemOrDelay();
    }

    function footLockercheckout()
    {
        let checkoutBtn = null;
        if (opts.PayPal)
        {
            checkoutBtn = document.querySelector("a[title='Check Out with PayPal']");
        }
        else
        {
            checkoutBtn = document.querySelector("a[title='Checkout Button']");
        }
        clickNode(checkoutBtn);
    }
})();