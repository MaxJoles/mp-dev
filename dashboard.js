MemberStack.onReady.then(async function (member) {

    await loader(); // wait for Finsweet loadmore to execute
    const metadata = await member.getMetaData();


    // Track dashboard actions
    metadata.dashActions = metadata.dashActions || {};
    const dashActions = metadata.dashActions;

    if (dashActions) {
        console.log("executed");
        $('.cc-complete-checkbox').each((i, item) => {
            var actionName = $(item).attr('id');
            if (actionName in dashActions) {
                $(item).hide();
            }
            else {
                $(item).siblings('.cc-completed-check').hide();
            }
        });
    }


    $('.cc-complete-checkbox').click(function (e) {
        e.preventDefault();
        var actionName = e.target.id;
        $(e.target).hide();
        $(e.target).siblings('.cc-completed-check').show();
        metadata.dashActions[actionName] = 'true';
        member.updateMetaData(metadata);
    });


    // Display saved and completed items in dashboard

    const savedList = metadata.savedList;
    const completedList = metadata.completedList;
    const followList = metadata.followList;

    // filter for saved items
    if (metadata.savedItemsNum) {
        $('.cc-saved-count').text(metadata.savedItemsNum)
    }
    else {
        $('.cc-saved-count').text(0);
    }

    if (savedList) {
        $('.cc-meta-item.cc-saved .cc-filter-slug').each((i, item) => {
            if (savedList.indexOf($.trim($(item).text())) !== -1) {
                $(item).closest('.cc-meta-item.cc-saved').appendTo('.cc-saved-list');
            }
        });
    }


    // filter for completed items
    if (metadata.completeitemsNum) {
        $('.cc-completed-count').text(metadata.completeitemsNum)
    }
    else {
        $('.cc-completed-count').text(0);
    }

    if (completedList) {
        $('.cc-meta-item.cc-completed .cc-filter-slug').each((i, item) => {
            if (completedList.indexOf($.trim($(item).text())) !== -1) {
                $(item).closest('.cc-meta-item.cc-completed').appendTo('.cc-completed-list');
            }
        });
    }

    // filter for followed items
    if (metadata.followitemsNum) {
        $('.cc-follow-count').text(metadata.followitemsNum)
    }
    else {
        $('.cc-follow-count').text(0);
    }

    if (followList) {
        $('.cc-meta-item.product .cc-filter-slug').each((i, item) => {
            if (followList.indexOf($.trim($(item).text())) !== -1) {
                $(item).closest('.cc-meta-item.product').appendTo('.cc-following-list');
            }
        });
    }




    // remove saved item
    $('.cc-remove-saved').click(function (e) {
        e.preventDefault();
        const savedItem = $(this).closest('.cc-meta-item');
        const watchName = savedItem.find('.cc-filter-slug').text();
        savedList.splice(savedList.indexOf($.trim(watchName)), 1);
        metadata.savedItemsNum = savedList.length;
        $('.cc-saved-count').text(metadata.savedItemsNum);
        member.updateMetaData(metadata);
        savedItem.css('display', 'none');
    });

    // remove completed item
    $('.cc-remove-completed').click(function (e) {
        e.preventDefault();
        const completedItem = $(this).closest('.cc-meta-item');
        const completeName = completedItem.find('.cc-filter-slug').text();
        completedList.splice(completedList.indexOf($.trim(completeName)), 1);
        metadata.completeitemsNum = completedList.length;
        $('.cc-completed-count').text(metadata.completeitemsNum);
        member.updateMetaData(metadata);
        completedItem.css('display', 'none');
    });

    // remove followed item
    $('.cc-remove-follow').click(function (e) {
        e.preventDefault();
        const followedItem = $(this).closest('.cc-meta-item');
        const followedName = followedItem.find('.cc-filter-slug').text();
        followList.splice(followList.indexOf($.trim(followedName)), 1);
        metadata.followitemsNum = followList.length;
        $('.cc-follow-count').text(metadata.followitemsNum);
        member.updateMetaData(metadata);
        followedItem.css('display', 'none');
    });


    // adding and displaying achievements
    $('#welcome-badge').show()

    if (followList.length > 5) {
        $('#tool-master').show();
    }

    if (completedList.length > 5) {
        $('#5-lessons-complete').show();
    }

    if ('introduction' in dashActions) {
        $('#friendly-member').show();
    }


});
