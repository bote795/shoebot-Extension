(function()
{
    var url = window.location.href;
    var opts = {};

    async function init()
    {
        await loadOptions();
        if (isUrl('footlocker.com'))
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
            else if (isUrl("footlocker.com/checkout"))
            {
                console.log("fill in form for user info");
            }
        }
    }
    init();
    async function loadOptions()
    {
        await delay(100);
        opts.PayPal = false;
        opts.size = "09.5";
        opts.billing_address = {
            country: "US",
            first_name: "test",
            last_name: "testLastName",
            street_address: "street address",
            apt_unit: null,
            zip_code: "95640",
            city: "city",
            state: "state",
            phone: "956",
            email: "email"
        };
        opts.promo_code = null;
        opts.payment_method = {
            card_number: "",
            card_expire_month: "",
            card_expire_year: "",
            card_csv: ""
        }
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