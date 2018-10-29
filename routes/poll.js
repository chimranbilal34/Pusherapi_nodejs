const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Vote = require('../models/vote')


var Pusher = require('pusher');
var pusher = new Pusher({
    appId: '600042',
    key: '55aaf063768a277d8c32',
    secret: 'daa945f14c5f2399cdec',
    cluster: 'ap2',
    encrypted: true
});


router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({
        success: true,
        votes: votes
    }))
})

router.post('/', (req, res) => {

    const newVote = {
        os: req.body.os,
        points: 1
    }

    Vote(newVote)
        .save()
        .then(vote => {
            pusher.trigger('os-poll', 'os-vote', {
                points: parseInt(vote.points),
                os: vote.os
            });
            return res.json({
                success: true,
                message: 'Thankyou for Voting'
            })
        })
})


module.exports = router