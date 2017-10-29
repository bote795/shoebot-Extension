/**
 * getter for chrome storage
 * @param  {Object} Objectkey object with key, value where value is the default
 * @return {Promise}           returns a promise
 */
function get(Objectkey)
{
    return new Promise(function(resolve, reject)
    {
        chrome.storage.sync.get(Objectkey, function(items)
        {
            if (chrome.runtime.lastError)
            {
                reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    })
}

/**
 * sets the data to chrome storage
 * @param {Object} key object with key, value pair where key is the key in db value is the value to store
 * @return {Promise}           returns a promise
 */
function set(key)
{
    return new Promise(function(resolve, reject)
    {
        chrome.storage.sync.set(key, function(items)
        {
            if (chrome.runtime.lastError)
            {
                reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    })
}


async function getData()
{
    try
    {
        var data = await get(
        {
            options:
            {
                enable: false,
                size: "09.5"
            }
        });
        return Promise.resolve(data.options);
    }
    catch (e)
    {
        console.warn("There was an error getting the data: ", e);
        Promise.reject(e);
    }
}