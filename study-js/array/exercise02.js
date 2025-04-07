let names = ["zehra", "ali", "veli", "şule", "şima", "ayşegül", "mustafa"]
console.log(names)
names.sort(function(name1,name2){
    return name1.localeCompare(name2,'tr')
})
console.log(names)
names.sort(function(name1,name2){
    return name2.localeCompare(name1,'tr')
})
console.log(names)
