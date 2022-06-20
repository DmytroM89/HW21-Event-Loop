// ------------- # 2
class Posts {
    constructor(url) {
        this.url = url;
        this.postTitleNode = document.querySelector('.post__title');
        this.postBodyNode = document.querySelector('.post__body');
        this.postCommentsNode = document.querySelector('.post__comments');
        this.postCommentField = document.querySelector('#postComment');
        this.addCommentBtn = document.querySelector('#addComment');

        this.addCommentBtn.addEventListener('click', (event) => {
            const postId = event.target.dataset.postId;
            this.addCommentToPost(postId, this.postCommentField.value)
                .then(result => {
                    const newComment = document.createElement('div');
                    newComment.classList.add('comment-item');
                    newComment.innerText = result.body;
                    this.postCommentsNode.append(newComment);

                    this.postCommentField.value = '';
                })
                .catch((err) => {
                    console.warn(err);
                })
        })
    }

    async getPosts() {
        const response = await fetch(this.url);

        if (response.ok) {
            return response.json();
        } else {
            console.warn('Error posts: ' + response.status);
        }
    }

    async getPostComments(postData) {
        const response = await fetch(this.url + `/${postData.id}/comments`);

        if (response.ok) {
            postData.comments = await response.json();

            return postData;
        } else {
            console.warn('Error comments: ' + response.status);
        }
    }

    async addCommentToPost(postId, commentText) {
        const response = await fetch(this.url + `/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({body: commentText})
        });

        if (response.ok) {
            return response.json();
        } else {
            console.warn('Error comments: ' + response.status);
        }
    }


    async render(postData) {
        try {
            this.postTitleNode.innerHTML = postData.title;

            this.postBodyNode.innerHTML = postData.description ? postData.description : postData.body;
            this.addCommentBtn.dataset.postId = postData.id;

            let commentItems = '<h3>Comments</h3>';

            for (const comment of postData.comments) {
                commentItems += `<div class="comment-item">${comment.body}</div>`
            }

            this.postCommentsNode.innerHTML = commentItems;
        } catch (err) {
            console.warn('Error render: ' + err);
        }
    }
}

//const posts = new Posts('http://localhost:3000/posts');
const posts = new Posts('https://jsonplaceholder.typicode.com/posts');

posts.getPosts()
    .then(allPosts => allPosts[0])
    .then(firstPost => posts.getPostComments(firstPost))
    .then(postData => posts.render(postData))
    .catch((err) => {
        console.warn(err);
    })


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


