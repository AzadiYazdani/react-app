export function makeBusinessTypeTree(list){

    const map = {};

    list.forEach(item => {

        map[item.id] = {
            ...item,
            children:[]
        };

    });


    const tree = [];


    list.forEach(item => {

        if(Number(item.parentId) === 0){

            tree.push(map[item.id]);

        } else {

            if(map[item.parentId]){

                map[item.parentId].children.push(
                    map[item.id]
                );

            }

        }

    });


    return tree;
}
