/*
* /blog tests
*/

module.exports = function(agent, expect, tearDown) {

    describe('/v1/blog tests', function(){
        var blog = {
            title: 'An automated test blog post',
            body: 'This is an auto-generated blog post. It was created during automated testing.',
            author: 'Steve Good',
            datePublished: new Date()
        };

        it('create a blog post', function(done){
            agent.post('http://localhost:3000/v1/blog')
                .send(blog)
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(typeof res.body).to.eql('object');
                    expect(res.body.slug).to.not.eql(null);
                    expect(res.body.slug.length).to.be.lessThan(blog.title.length+1);

                    blog.slug = res.body.slug; // note the slug so we can delete the post later

                    expect(res.body.title).to.eql(blog.title);
                    expect(res.body.body).to.eql(blog.body);
                    expect(res.body.author).to.eql(blog.author);

                    done();
                });
        });

        it('get a blog post', function(done){
            agent.get('http://localhost:3000/v1/blog/' + blog.slug)
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(typeof res.body).to.eql('object');
                    expect(res.body.slug).to.eql(blog.slug);
                    expect(res.body.title).to.eql(blog.title);
                    expect(res.body.body).to.eql(blog.body);
                    expect(res.body.author).to.eql(blog.author);

                    done();
                });
        });

        it('list up to 5 blog posts', function(done){
            agent.get('http://localhost:3000/v1/blog?page=1&limit=5')
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(res.body.length).to.be.lessThan(11);

                    done();
                });
        });

        it('update a blog post', function(done){
            blog.author = blog.author + ' X';
            blog.body = blog.body + ' X';
            agent.put('http://localhost:3000/v1/blog/' + blog.slug)
                .send(blog)
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(typeof res.body).to.eql('object');
                    expect(res.body.author).to.eql(blog.author);
                    expect(res.body.body).to.eql(blog.body);

                    done();
                });
        });

        it('delete a blog post', function(done){
            agent.del('http://localhost:3000/v1/blog/' + blog.slug)
                .end(function(e, res){
                    expect(e).to.eql(null);
                    expect(typeof res.body).to.eql('object');
                    expect(res.status).to.eql(200);
                    expect(res.body.message).to.eql('success');

                    done();
                });
        });

        it('tearing down tests', function(done){
            done();
            tearDown('blog');
        });
    });
};