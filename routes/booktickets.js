// module.exports = (() => {
//     global.app.post('/ticket', (req, res) => {
//         var showid = req.body.showid;
//         var seatno = req.body.seatno;
//         if (showid != "") {
//             if (seatno != "") {

//                 global.db_con.query("select * from Ticket", (err, result) => {
//                     if (result == null || result == "") {
//                         var t_num = '11';
//                         var ticketno1 = "23" + t_num;
//                         var sql = `insert into Ticket values ("${ticketno1}","${showid}","${seatno}")`;
//                         global.db_con.query(sql, (err, result) => {
//                             if (err == null) {
//                                 console.log(result);
//                                 res.render('booktickets', { alert: 's1' });
//                             } else {
//                                 console.log(err.sqlMessage);
//                                 res.render('booktickets', { alert: 'ei' })
//                             }
//                         })
//                     } else {
//                         let user_arr = result.find(user => user.seatno == seatno);
//                         if (typeof user_arr !== "undefined") {
//                             res.render('booktickets', { alert: 'r1' });
//                         } else {
//                             var lastelement = result.slice(-1);
//                             var lastelement1 = lastelement.map(({ ticketno }) => ticketno)
//                             ticketno1 = Number(lastelement1) + 1;
//                             var sql = `insert into Ticket values ("${ticketno1}","${showid}","${seatno}")`;
//                             global.db_con.query(sql, (err, result) => {
//                                 if (err == null) {
//                                     console.log(result);
//                                     res.render('booktickets', { alert: 's1' });
//                                 } else {
//                                     console.log(err.sqlMessage);
//                                     res.render('booktickets', { alert: 'ei' })
//                                 }
//                             })
//                         }
//                     }
//                 })

//             } else {
//                 res.render('booktickets', { alert: 'e1' })
//             }
//         } else {
//             res.render('booktickets', { alert: 'e2' })
//         }
//     })
// })