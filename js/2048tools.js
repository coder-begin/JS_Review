/**
 * Created by rulersex on 2017/7/15.
 */
var tools={
    hasBlock: function (beginLocal,endLocal,dir,cellArr) {
        switch (dir){
            case "left":
                return false;
            case "right":
                if(beginLocal[1]+1==endLocal[1]){
                    return false;
                }else{
                    for(var i=beginLocal[1]+1;i<endLocal[1];i++){
                        if(cellArr[beginLocal[0]][i] != 0){
                            return true;
                        }
                    }
                    return false;
                }


            case "up":
                return false;
            case "down":
                return false;
        }

    },
    canMove: function (cellArr,dir,beginLocal) {
        switch (dir){
            case "left":
                break;
            case "right":
                if(cellArr[beginLocal[0]][beginLocal[1]+1] == 0 || cellArr[beginLocal[0]][beginLocal[1]].num == cellArr[beginLocal[0]][beginLocal[1]+1].num){
                            return true;
                }
                return false;
            case "up":

                break;
            case "down":

                break;
        }

    },
    getRandomNum: function(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }
}