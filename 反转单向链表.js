const reverseList = (head) => {
  if(!head || !head.next){
    return head
  }

  let pre = null
  let current = head
  while(current){
    [current.next, pre, current] = [pre, current, current.next]
  }

  return pre
}