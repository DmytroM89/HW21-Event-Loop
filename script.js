// ------------- # 2
class Posts {
    constructor(url) {
        this.url = url;
        this.postTitleNode = document.querySelector('.post__title');
        this.postBodyNode = document.querySelector('.post__body');
        this.postCommentsNode = document.querySelector('.post__comments');
    }

    async getPosts() {
        const response = await fetch(this.url);

        if (response.ok) {
            return response.json();
        } else {
            console.warn('Error posts: ' + response.status);
        }
    }

    async getPostComments(postId) {
        const response = await fetch(this.url + `/${postId}/comments`);

        if (response.ok) {
            return response.json();
        } else {
            console.warn('Error comments: ' + response.status);
        }
    }

    async render() {
        try {
            const posts = await this.getPosts();
            const postComments = await this.getPostComments(posts[0].id);

            this.postTitleNode.innerHTML = posts[0].title;
            this.postBodyNode.innerHTML = posts[0].body;

            let commentItems = '<h3>Comments</h3>';

            for (const comment of postComments) {
                commentItems += `<div class="comment-item">${comment.name}</div>`
            }

            this.postCommentsNode.innerHTML = commentItems;

        } catch (err) {
            console.warn('Error render: ' + err);
        }
    }
}

class Comments {
    constructor(url) {
        this.url = url;
        this.addCommentBtn = document.querySelector('#addComment');
        this.commentField = document.querySelector('#postComment');

        this.addCommentBtn.addEventListener('click', (e) => {
            console.log(e.target);
        });
    }

}

const posts = new Posts('https://jsonplaceholder.typicode.com/posts');
const comments = new Comments('https://jsonplaceholder.typicode.com/comments');

posts.render();


// ------------- # 3
console.log('------------- # 3');

console.log(1);

setTimeout(function () {
    console.log(2);
}, 100);

setTimeout(function () {
    console.log(3);
}, 0);

new Promise(function (resolve) {
    setTimeout(() => resolve(), 50);
}).then(() => {
    console.log(4);
});

console.log(5);


