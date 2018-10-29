var form = document.getElementById('vote-form')
form.addEventListener('submit', e => {

    var choice = document.querySelector('input[name=os]:checked').value
    const data = { os: choice }

    fetch('http://localhost:3000/poll', {
            method: 'post',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

    e.preventDefault()
})

//get route
fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes


        const totalvotes = votes.length

        const votecount = votes.reduce((acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc), {});



        var dataPoints = [
            { label: "Windows", y: votecount.Windows },
            { label: "MacOS", y: votecount.MacOs },
            { label: "Linux", y: votecount.Linux },
            { label: "Other", y: votecount.Other }
        ]
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "dark1", // "light2", "dark1", "dark2"
            animationEnabled: true, // change to true		
            title: {
                text: `Total Vote : ${totalvotes}`
            },
            data: [{
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "column",
                dataPoints: dataPoints

            }]
        });
        chart.render();

        Pusher.logToConsole = true;

        var pusher = new Pusher('55aaf063768a277d8c32', {
            cluster: 'ap2',
            forceTLS: true
        });

        var channel = pusher.subscribe('os-poll');
        channel.bind('os-vote', function(data) {
            dataPoints = dataPoints.map(x => {
                if (x.label == data.os) {
                    x.y = data.points;
                    return x
                } else {
                    return x
                }
            });
            chart.render()
        });
    })