document.addEventListener('DOMContentLoaded', function() {
    const tocItems = document.querySelectorAll('.toc-item.has-children > a');
    tocItems.forEach(function(tocItem) {
        tocItem.addEventListener('click', function(event) {
            const parent = tocItem.parentNode;
            if (parent.classList.contains('expanded')) {
                parent.classList.remove('expanded');
            } else {
                parent.classList.add('expanded');
            }
            event.preventDefault();
        });
    });
});