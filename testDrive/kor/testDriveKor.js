﻿var builder = require('botbuilder');
var stringBuilder = require('stringbuilder');
var query = require('../../config/query');
var date = require('date-utils');
date = new Date();
var data = "";

function create(bot) {
    
    var responseTime;
    
    
    

     bot.dialog('/korTestDriveMain', [                                      //bot.dialog('/korTestDrive start


        

        function (session, args, next) {
            
            var aa = query.getData("select_catType", function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            console.log("AA : " + aa);
            
            

            //console.log("sid : " + args.key + " || message : " + args.sendMsg + "|| begin date : " + args.beginTime + " || intent : " + args.intent+ " || "+args.tableNm);
            var msg = new builder.Message(session)
            .attachments([
            
                new builder.HeroCard(session)
                    .title("시승")
                    .text("맞아요!! \n\n 한번 타 보셔야 저를 좀 더 잘 알 수 있겠죠!! \n\n 시승 신청을 하시기 위해서는 온라인에서 예약을 하시거나 \n\n 지점에 직접 연락을 해 주셔야 해요. \n\n제가 도와 드릴께요, 어떤 방법이 편하시겠어요?")
                    //.text(str)
                    .buttons([
                
                    builder.CardAction.imBack(session, "온라인 예약 알려줘", "온라인 예약"),
                    builder.CardAction.imBack(session, "시승선터 전화예약 알려줘", "시승센터 전화예약")
                ])
            ]);
            builder.Prompts.choice(session, msg, "온라인 예약|시승센터 전화예약 ");
            
            session.endDialog();
            session.beginDialog('/korReMainMenu');
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);
    
    
    bot.dialog('/korOnlineTestDrive' , [
    
        function (session, args, next) { 
            console.log("sid : " + args.key +" || message : "+ args.sendMsg +"|| begin date : " + args.beginTime + " || intent : "+args.intent);
            //session.send("korOnlineTestDrive session key : " + session.message.sourceEvent.clientActivityId);
            //query.getData(args);
            session.send("온라인 예약 방법을 알려 드릴께요!!");
            
                                var onlineReserveCard = new builder.HeroCard(session)
                                    .title('현대자동차 시승센터')
                                    .subtitle('현대자동차 시승센터에서 다양한 시승 서비스를 경험하세요. \n\n온라인 예약 시 회원가입이 필요합니다.')
                                    .images([
                                        new builder.CardImage(session)
                                            .url(img_path + "/images/testDrive/testDriveReservation.jpg")
                                            .alt('contoso_flowers')
                                    ])
                                    .buttons([
                                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "여기에서 예약할수 있어요^^*"),
                                    ]);
                                session.send(new builder.Message(session).addAttachment(onlineReserveCard));
                                session.send("멋진 시승 하세요^^");
            
            session.endDialog();
            session.beginDialog('/korReMainMenu');

            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);

    /***********************************************************************************
        한국어 시승 - 시승센터 전화 예약 메뉴
    ************************************************************************************/

    bot.dialog('/korNoAreaOfflineTestDrive', [

        function (session, args, next) {
            console.log("sid : " + args.key + " || message : " + args.sendMsg + "|| begin date : " + args.beginTime + " || intent : " + args.intent);
            //session.send(session.message.text);
            var msg = new builder.Message(session)
            .attachments([
            
                new builder.HeroCard(session)
                    .title("시승센터")
                    .text("시승센터를 찾기위하여 원하시는 지역을 선택해주세요..")
                    //.text(str)
                    .buttons([
                
                    builder.CardAction.imBack(session, "서울 시승센터 찾아줘", "서울"),
                    builder.CardAction.imBack(session, "부산 시승센터 찾아줘", "부산")
                ])
            ]);
            builder.Prompts.choice(session, msg, "서울|부산");
            session.endDialog();

            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);
    
    bot.dialog('/korAreaOfflineTestDrive', [
    
        function (session , args, next) {
            
            console.log("sid : " + args.key + " || message : " + args.sendMsg + "|| begin date : " + args.beginTime + " || intent : " + args.intent);
            
            
            
            
            if (session.message.text.match(/서울/g) ) { 
                
                session.send("[ 서울 ] 의 시승센터 관련 정보입니다.");
                var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("성내 시승센터")
                        .subtitle("전화번호 : 02-473-7365(FAX : 02-2225-4736) 센터주소 : (05381) 서울 강동구 천호대로 1096 현대자동차 성내지점 3층 성내시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/seongnae.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/seongnae.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:1", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title("잠실 시승센터")
                        .subtitle("전화번호 : 02-421-7365(FAX : 02-421-4737) 센터주소 : (05502) 서울 송파구 올림픽로 145 리센츠빌딩 2층 C10호 잠실시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/jamsil.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/jamsil.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:2", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title("공릉 시승센터")
                        .subtitle("전화번호 : 02-973-7365(FAX : 02-3296-6218) 센터주소 : (01861) 서울 노원구 화랑로 429 현대자동차 공릉지점옆 공릉시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/gongnung.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/gongnung.png"))
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:3", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title("목동 시승센터")
                        .subtitle("전화번호 : 02-2644-7365(FAX : 02-2644-7359) 센터주소 : (07995) 서울 양천구 목동서로 225 한국예술인협회 2층 목동시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/mokdong.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/mokdong.png"))
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:4", "Select")
                    ])
                ]);
            
            } else if (session.message.text.match(/부산/g) ) { 
            
                session.send("[ 부산 ] 의 시승센터 관련 정보입니다.");
                var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("부산중앙 시승센터")
                        .subtitle("전화번호 051-465-7365 (FAX:051-465-7350) 센터주소 (48728) 부산 동구 중앙대로 360 협성타워빌딩 1층 101호 현대자동차 부산중앙시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/busan/busandongbu.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/busan/busandongbu.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:1", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title("부산동부 시승센터")
                        .subtitle("전화번호 051-517-7365 (FAX:051-517-7363) 센터주소 (46233) 부산 금정구 중앙대로 1883 현대자동차 금정지점 1층 부산동부시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/busan/busanjuang.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/busan/busanjuang.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:2", "Select")
                    ])
                ]);
            }
            session.send(msg);
            session.endDialog();
            session.beginDialog('/korReMainMenu');
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });



        }
            
            

            //if (session.message.text.match(/서울/g)) { 
            //    session.send("[ " + session.message.text + " ] 의 시승센터 관련 정보입니다.");
            //    var msg = new builder.Message(session)
            //    .attachmentLayout(builder.AttachmentLayout.carousel)
            //    .attachments([
            //        new builder.HeroCard(session)
            //            .title("성내 시승센터")
            //            .subtitle("전화번호 : 02-473-7365(FAX : 02-2225-4736) 지점주소 : (05381) 서울 강동구 천호대로 1096 현대자동차 성내지점 3층 성내시승센터")
            //            .images([
            //            builder.CardImage.create(session, img_path + "/images/testDrive/seoul/seongnae.png")
            //                    .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/seongnae.png")),
            //        ])
            //            .buttons([
            //            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
            //                //,builder.CardAction.imBack(session, "select:1", "Select")
            //        ]),
            //        new builder.HeroCard(session)
            //            .title("잠실 시승센터")
            //            .subtitle("전화번호 : 02-421-7365(FAX : 02-421-4737) 지점주소 : (05502) 서울 송파구 올림픽로 145 리센츠빌딩 2층 C10호 잠실시승센터")
            //            .images([
            //            builder.CardImage.create(session, img_path + "/images/testDrive/seoul/jamsil.png")
            //                    .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/jamsil.png")),
            //        ])
            //            .buttons([
            //            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
            //                //,builder.CardAction.imBack(session, "select:2", "Select")
            //        ]),
            //        new builder.HeroCard(session)
            //            .title("공릉 시승센터")
            //            .subtitle("전화번호 : 02-973-7365(FAX : 02-3296-6218) 지점주소 : (01861) 서울 노원구 화랑로 429 현대자동차 공릉지점옆 공릉시승센터")
            //            .images([
            //            builder.CardImage.create(session, img_path + "/images/testDrive/seoul/gongnung.png")
            //                    .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/gongnung.png"))
            //        ])
            //            .buttons([
            //            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
            //                //,builder.CardAction.imBack(session, "select:3", "Select")
            //        ]),
            //        new builder.HeroCard(session)
            //            .title("목동 시승센터")
            //            .subtitle("전화번호 : 02-2644-7365(FAX : 02-2644-7359) 지점주소 : (07995) 서울 양천구 목동서로 225 한국예술인협회 2층 목동시승센터")
            //            .images([
            //            builder.CardImage.create(session, img_path + "/images/testDrive/seoul/mokdong.png")
            //                    .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/mokdong.png"))
            //        ])
            //            .buttons([
            //            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
            //                //,builder.CardAction.imBack(session, "select:4", "Select")
            //        ])
            //    ]);

            ////}

            
            
            //session.send(msg);
            //session.endDialog();
            //session.beginDialog('/korReMainMenu');
            
            //responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            //query.insertHistoryQuery(args, responseTime, function (err, result) {
            //    if (!err) {
            //        console.log("query.getData : " + result);
            //    }
            //});
        
        //}
    ]);
}

module.exports = {
    create
}