const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/needed', rejectUnauthenticated,   (req,res)=> {

  console.log('in /needed with this id:', req.user.id);
  const id = req.user.id;
  const sqlText = `select "family"."image" as "claimer_image", "family2"."image" as "requester_image", "family2"."last_name1" as "requester_name", "family"."last_name1" as "claimer_name", "event"."id", "event"."event_date", "event"."event_time_start", "event"."event_time_end", "event"."event_claimed"from "event"
                    left join "family" on
                    "event"."claimer_id" = "family"."id"
                    left join "family" as "family2" on
                    "event"."requester_id" = "family2"."id"
                    where "family2"."user_id"=$1 order by id desc;`;
  pool.query(sqlText, [id])
    .then((response) => {
      console.log('back from feedNeed response.data:', response.rows);
      res.send(response.rows)
    }).catch((error) => {
      console.log('error getting group data', error);
      res.sendStatus(500);
    })
})

router.get('/offered', rejectUnauthenticated,   (req,res)=> {
  console.log('In FEED ROUTER GET YOUR FEED')
  const sqlText = `SELECT * from event_offered
  WHERE requester_id= $1;`;
  const value = [req.user.id];
  pool.query(sqlText, value)
  .then((response)=> {
    console.log('respnse from DB', response);
    res.send(response.rows[0]);
    
  })
  .catch((error) => {
    console.log('Error getting from event_offered table', error);
    res.sendStatus(500);
    
  })
})
//updates event to claimed
router.put('/update/:id', rejectUnauthenticated,  (req,res)=> {
  const sqlText = `UPDATE "event" SET "event_claimed"=$1, "claimer_id"=$2, "claimer_notes"=$3 WHERE id =$4;`;
  console.log(req.body.event_claimed)
  values = [req.body.event_claimed, req.body.claimer_id, req.body.claimer_notes, req.params.id];
  pool.query(sqlText, values)
  .then((response) => {
    res.sendStatus(200);
  })
  .catch((error)=> {
    console.log('Error with UPDATING the DB', error);
    res.sendStatus(500);
  })
})
//updates event to confirmed
router.put('/updateConfirm/:id', rejectUnauthenticated,  (req, res) => {
  console.log('in updateConfirm event', req.body.event_confirmed)
  const sqlText = `UPDATE "event" SET "event_confirmed"=$1, 
  WHERE "id" =$3`;
  values = [req.body.event_confirmed, req.params.id];
  pool.query(sqlText, values)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error with UPDATING EVENT CONFIRM the DB', error);
      res.sendStatus(500);
    })
})

router.post('/addRequest', rejectUnauthenticated, (req,res)=> {
  const sqlText = `insert into "event" ("event_date", "event_time_start", "event_time_end", "group_id", "notes", "requester_id", "offer_needed")
  values($1, $2, $3, $4, $5, $6, $7)`;
  values = [req.body.event_date, req.body.event_time_start, req.body.event_time_end, req.body.group_id, req.body.notes, req.body.requester_id, req.body.offer_needed];
  pool.query(sqlText, values)
  .then((response) => {
    res.sendStatus(201);
  })
  .catch((error)=> {
    console.log('Error with UPDATING the DB', error);
    res.sendStatus(500);
  })
})


module.exports = router;

