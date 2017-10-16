(function()
{
    console.log("inside shoe bot extension");
    var url = window.location.href;
    var opts = {};
    loadOptions();
    if (isUrl('footlocker.com'))
    {
        //selecting shoe
        if (isUrl('footlocker.com/product/model'))
        {
            footLockerAutoADD();
        }
        else if (isUrl("footlocker.com/shoppingcart"))
        {
            checkout();
        }
    }
    /**
     * TODO: need to make is so that each dif uri/page activates specific functions
     */
    function loadOptions()
    {
        opts.PayPal = false;
        opts.size = "09.5";
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
        delay(1000)
            .then(function()
            {
                clickNode(document.querySelectorAll("#miniAddToCart_actions > div.top_row > a")[1]);
                return {};
            })
    }

    function checkout()
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