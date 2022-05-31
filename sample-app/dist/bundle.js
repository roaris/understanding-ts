(()=>{"use strict";class e{constructor(e,t,n,r){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}function t(e){let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),e.minLength&&"string"==typeof e.value&&(t=t&&e.value.length>=e.minLength),e.maxLength&&"string"==typeof e.value&&(t=t&&e.value.length<=e.maxLength),e.min&&"number"==typeof e.value&&(t=t&&e.value>=e.min),e.max&&"number"==typeof e.value&&(t=t&&e.value<=e.max),t}function n(e,t,n){const r=n.value;return{configurable:!0,get(){return r.bind(this)}}}var r;!function(e){e[e.Active=0]="Active",e[e.Finished=1]="Finished"}(r||(r={}));class s{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.manday=r,this.status=s}}class i extends class{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new i),this.instance}addProject(e,t,n){const i=new s(Math.random().toString(),e,t,n,r.Active);this.projects.push(i),this.updateListeners()}moveProject(e,t){const n=this.projects.find((t=>t.id==e));n&&n.status!==t&&(n.status=t,this.updateListeners())}updateListeners(){for(const e of this.listeners)e(this.projects.slice())}}const a=i.getInstance();class o extends e{constructor(){super("project-input","app",!0,"user-input"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.mandayInputElement=this.element.querySelector("#manday"),this.configure()}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}gatherUserInput(){const e=this.titleInputElement.value,n=this.descriptionInputElement.value,r=this.mandayInputElement.value,s={value:n,required:!0,minLength:5},i={value:+r,required:!0,min:1,max:1e3};return t({value:e,required:!0})&&t(s)&&t(i)?[e,n,+r]:void alert("入力値が正しくありません。")}submitHandler(e){e.preventDefault();const t=this.gatherUserInput();if(Array.isArray(t)){const[e,n,r]=t;a.addProject(e,n,r),this.clearInputs()}}clearInputs(){this.titleInputElement.value="",this.descriptionInputElement.value="",this.mandayInputElement.value=""}}!function(e,t,n,r){var s,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);i>3&&a&&Object.defineProperty(t,n,a)}([n],o.prototype,"submitHandler",null);var l=function(e,t,n,r){var s,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a};class c extends e{constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}get manday(){return this.project.manday<20?this.project.manday.toString()+"人日":(this.project.manday/20).toString()+"人月"}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log("終了")}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=this.manday,this.element.querySelector("p").textContent=this.project.description}}l([n],c.prototype,"dragStartHandler",null),l([n],c.prototype,"dragEndHandler",null);var d=function(e,t,n,r){var s,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a};class u extends e{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignedProjects=[],this.configure(),this.renderContent()}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dropHandler(e){const t=e.dataTransfer.getData("text/plain");a.moveProject(t,"active"===this.type?r.Active:r.Finished),this.element.querySelector("ul").classList.remove("droppable")}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("drop",this.dropHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),a.addListener((e=>{const t=e.filter((e=>"active"===this.type?e.status===r.Active:e.status===r.Finished));this.assignedProjects=t,this.renderProjects()}))}renderContent(){const e=`${this.type}-projects-list`;this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent="active"===this.type?"実行中プロジェクト":"完了プロジェクト"}renderProjects(){const e=document.getElementById(`${this.type}-projects-list`);e.innerHTML="";for(const t of this.assignedProjects)new c(e.id,t)}}d([n],u.prototype,"dragOverHandler",null),d([n],u.prototype,"dropHandler",null),d([n],u.prototype,"dragLeaveHandler",null),new o,new u("active"),new u("finished")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eEMsWUFDRXJFLEtBQUtRLFFBQVE4RCxpQkFBaUIsV0FBWXRFLEtBQUtxRyxpQkFDL0NyRyxLQUFLUSxRQUFROEQsaUJBQWlCLE9BQVF0RSxLQUFLeUcsYUFDM0N6RyxLQUFLUSxRQUFROEQsaUJBQWlCLFlBQWF0RSxLQUFLOEcsa0JBRWhEaEQsRUFBYXBCLGFBQWFJLElBQ3hCLE1BQU1pRSxFQUFtQmpFLEVBQVNrRSxRQUFRcEQsR0FDdEIsV0FBZDVELEtBQUttRyxLQUNBdkMsRUFBSXJCLFNBQVdMLEVBQWNtQixPQUUvQk8sRUFBSXJCLFNBQVdMLEVBQWMwRSxXQUV0QzVHLEtBQUtvRyxpQkFBbUJXLEVBQ3hCL0csS0FBS2lILG9CQUlUekMsZ0JBQ0UsTUFBTTBDLEVBQVMsR0FBR2xILEtBQUttRyxxQkFDdkJuRyxLQUFLUSxRQUFRMEQsY0FBYyxNQUFPeEQsR0FBS3dHLEVBQ3ZDbEgsS0FBS1EsUUFBUTBELGNBQWMsTUFBTytCLFlBQTRCLFdBQWRqRyxLQUFLbUcsS0FBb0IsWUFBYyxXQUdqRmMsaUJBQ04sTUFBTUUsRUFBU2pILFNBQVNDLGVBQWUsR0FBR0gsS0FBS21HLHNCQUMvQ2dCLEVBQU9DLFVBQVksR0FDbkIsSUFBSyxNQUFNQyxLQUFXckgsS0FBS29HLGlCQUN6QixJQUFJYixFQUFZNEIsRUFBT3pHLEdBQUkyRyxJQWxEL0IsR0FEQzNGLEcsb0NBVUQsR0FEQ0EsRyxnQ0FVRCxHQURDQSxHLHFDQ2xDSCxJQUFJc0MsRUFDSixJQUFJa0MsRUFBWSxVQUNoQixJQUFJQSxFQUFZLGEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYW1wbGUtYXBwLy4vc3JjL2NvbXBvbmVudHMvYmFzZS1jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLWFwcC8uL3NyYy91dGlsL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLWFwcC8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kLnRzIiwid2VicGFjazovL3NhbXBsZS1hcHAvLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLWFwcC8uL3NyYy9zdGF0ZS9wcm9qZWN0LXN0YXRlLnRzIiwid2VicGFjazovL3NhbXBsZS1hcHAvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LnRzIiwid2VicGFjazovL3NhbXBsZS1hcHAvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWl0ZW0udHMiLCJ3ZWJwYWNrOi8vc2FtcGxlLWFwcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC50cyIsIndlYnBhY2s6Ly9zYW1wbGUtYXBwLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb21wb25lbnQgQ2xhc3NcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcbiAgdGVtcGxhdGVFbGVtZW50OiBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICBob3N0RWxlbWVudDogVDtcbiAgZWxlbWVudDogVTtcblxuICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZUlkOiBzdHJpbmcsIGhvc3RFbGVtZW50SWQ6IHN0cmluZywgaW5zZXJ0QXRTdGFydDogYm9vbGVhbiwgbmV3RWxlbWVudElkPzogc3RyaW5nKSB7XG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgICB0aGlzLmhvc3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaG9zdEVsZW1lbnRJZCkhIGFzIFQ7XG5cbiAgICBjb25zdCBpbXBvcnRlZE5vZGUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsIHRydWUpO1xuICAgIHRoaXMuZWxlbWVudCA9IGltcG9ydGVkTm9kZS5maXJzdEVsZW1lbnRDaGlsZCBhcyBVO1xuICAgIGlmIChuZXdFbGVtZW50SWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5pZCA9IG5ld0VsZW1lbnRJZDtcbiAgICB9XG5cbiAgICB0aGlzLmF0dGFjaChpbnNlcnRBdFN0YXJ0KTtcbiAgfVxuXG4gIGFic3RyYWN0IGNvbmZpZ3VyZSgpOiB2b2lkO1xuICBhYnN0cmFjdCByZW5kZXJDb250ZW50KCk6IHZvaWQ7XG5cbiAgcHJpdmF0ZSBhdHRhY2goaW5zZXJ0QXRCZWdpbm5pbmc6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudChpbnNlcnRBdEJlZ2lubmluZyA/ICdhZnRlcmJlZ2luJyA6ICdiZWZvcmVlbmQnLCB0aGlzLmVsZW1lbnQpO1xuICB9XG59XG4iLCIvLyB2YWxpZGF0aW9uXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlIHtcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICBtaW5MZW5ndGg/OiBudW1iZXI7XG4gIG1heExlbmd0aD86IG51bWJlcjtcbiAgbWluPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZSh2YWxpZGF0YWJsZUlucHV0OiBWYWxpZGF0YWJsZSkge1xuICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gIGlmICh2YWxpZGF0YWJsZUlucHV0LnJlcXVpcmVkKSB7XG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDA7XG4gIH1cbiAgaWYgKHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoID49IHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoO1xuICB9XG4gIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aCAmJiB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aDtcbiAgfVxuICBpZiAodmFsaWRhdGFibGVJbnB1dC5taW4gJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbjtcbiAgfVxuICBpZiAodmFsaWRhdGFibGVJbnB1dC5tYXggJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heDtcbiAgfVxuICByZXR1cm4gaXNWYWxpZDtcbn1cbiIsIi8vIGF1dG9iaW5kIGRlY29yYXRvclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKHRhcmdldDogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGNvbnN0IGFkakRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0KCkge1xuICAgICAgY29uc3QgYm91bmRGbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XG4gICAgICByZXR1cm4gYm91bmRGbjtcbiAgICB9LFxuICB9O1xuICByZXR1cm4gYWRqRGVzY3JpcHRvcjtcbn1cbiIsIi8vIFByb2plY3QgVHlwZVxuZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XG4gIEFjdGl2ZSxcbiAgRmluaXNoZWQsXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGlkOiBzdHJpbmcsXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgcHVibGljIG1hbmRheTogbnVtYmVyLFxuICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcbiAgKSB7fVxufVxuIiwiaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcblxuLy8gUHJvamVjdCBTdGF0ZSBNYW5hZ2VtZW50XG50eXBlIExpc3RlbmVyPFQ+ID0gKGl0ZW1zOiBUW10pID0+IHZvaWQ7XG5cbmNsYXNzIFN0YXRlPFQ+IHtcbiAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdO1xuXG4gIGFkZExpc3RlbmVyKGxpc3RlbmVyRm46IExpc3RlbmVyPFQ+KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdD4ge1xuICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFByb2plY3RTdGF0ZSgpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgYWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBtYW5kYXk6IG51bWJlcikge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksIHRpdGxlLCBkZXNjcmlwdGlvbiwgbWFuZGF5LCBQcm9qZWN0U3RhdHVzLkFjdGl2ZSk7XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XG4gIH1cblxuICBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZCgocHJqKSA9PiBwcmouaWQgPT0gcHJvamVjdElkKTtcbiAgICBpZiAocHJvamVjdCAmJiBwcm9qZWN0LnN0YXR1cyAhPT0gbmV3U3RhdHVzKSB7XG4gICAgICBwcm9qZWN0LnN0YXR1cyA9IG5ld1N0YXR1cztcbiAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMoKSB7XG4gICAgZm9yIChjb25zdCBsaXN0ZW5lckZuIG9mIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lckZuKHRoaXMucHJvamVjdHMuc2xpY2UoKSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBwcm9qZWN0U3RhdGUgPSBQcm9qZWN0U3RhdGUuZ2V0SW5zdGFuY2UoKTtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgVmFsaWRhdGFibGUsIHZhbGlkYXRlIH0gZnJvbSAnLi4vdXRpbC92YWxpZGF0aW9uJztcbmltcG9ydCB7IGF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCc7XG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlJztcblxuLy8gUHJvamVjdElucHV0IENsYXNzXG5leHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRm9ybUVsZW1lbnQ+IHtcbiAgdGl0bGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICBtYW5kYXlJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ3Byb2plY3QtaW5wdXQnLCAnYXBwJywgdHJ1ZSwgJ3VzZXItaW5wdXQnKTtcblxuICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5tYW5kYXlJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI21hbmRheScpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICB9XG5cbiAgY29uZmlndXJlKCkge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpO1xuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHt9XG5cbiAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XG4gICAgY29uc3QgZW50ZXJlZFRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZTtcbiAgICBjb25zdCBlbnRlcmVkRGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlO1xuICAgIGNvbnN0IGVudGVyZWRNYW5kYXkgPSB0aGlzLm1hbmRheUlucHV0RWxlbWVudC52YWx1ZTtcbiAgICBjb25zdCB0aXRsZVZhbGlkYXRhYmxlOiBWYWxpZGF0YWJsZSA9IHtcbiAgICAgIHZhbHVlOiBlbnRlcmVkVGl0bGUsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsaWRhdGFibGU6IFZhbGlkYXRhYmxlID0ge1xuICAgICAgdmFsdWU6IGVudGVyZWREZXNjcmlwdGlvbixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgbWluTGVuZ3RoOiA1LFxuICAgIH07XG4gICAgY29uc3QgbWFuZGF5VmFsaWRhdGFibGU6IFZhbGlkYXRhYmxlID0ge1xuICAgICAgdmFsdWU6ICtlbnRlcmVkTWFuZGF5LFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBtaW46IDEsXG4gICAgICBtYXg6IDEwMDAsXG4gICAgfTtcbiAgICBpZiAoIXZhbGlkYXRlKHRpdGxlVmFsaWRhdGFibGUpIHx8ICF2YWxpZGF0ZShkZXNjcmlwdGlvblZhbGlkYXRhYmxlKSB8fCAhdmFsaWRhdGUobWFuZGF5VmFsaWRhdGFibGUpKSB7XG4gICAgICBhbGVydCgn5YWl5Yqb5YCk44GM5q2j44GX44GP44GC44KK44G+44Gb44KT44CCJyk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbZW50ZXJlZFRpdGxlLCBlbnRlcmVkRGVzY3JpcHRpb24sICtlbnRlcmVkTWFuZGF5XTtcbiAgICB9XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgcHJpdmF0ZSBzdWJtaXRIYW5kbGVyKGV2ZW50OiBFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdXNlcklucHV0ID0gdGhpcy5nYXRoZXJVc2VySW5wdXQoKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh1c2VySW5wdXQpKSB7XG4gICAgICBjb25zdCBbdGl0bGUsIGRlc2MsIG1hbmRheV0gPSB1c2VySW5wdXQ7XG4gICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzYywgbWFuZGF5KTtcbiAgICAgIHRoaXMuY2xlYXJJbnB1dHMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFySW5wdXRzKCkge1xuICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgdGhpcy5tYW5kYXlJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSAnLi4vbW9kZWxzL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQnO1xuXG4vLyBQcm9qZWN0SXRlbSBDbGFzc1xuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+IGltcGxlbWVudHMgRHJhZ2dhYmxlIHtcbiAgcHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0O1xuXG4gIGdldCBtYW5kYXkoKSB7XG4gICAgaWYgKHRoaXMucHJvamVjdC5tYW5kYXkgPCAyMCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvamVjdC5tYW5kYXkudG9TdHJpbmcoKSArICfkurrml6UnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKHRoaXMucHJvamVjdC5tYW5kYXkgLyAyMCkudG9TdHJpbmcoKSArICfkurrmnIgnO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgc3VwZXIoJ3NpbmdsZS1wcm9qZWN0JywgaG9zdElkLCBmYWxzZSwgcHJvamVjdC5pZCk7XG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcblxuICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5wcm9qZWN0LmlkKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgZHJhZ0VuZEhhbmRsZXIoXzogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ+e1guS6hicpO1xuICB9XG5cbiAgY29uZmlndXJlKCkge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kSGFuZGxlcik7XG4gIH1cblxuICByZW5kZXJDb250ZW50KCkge1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSB0aGlzLm1hbmRheTtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigncCcpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gJy4uL21vZGVscy9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL3Byb2plY3Qtc3RhdGUnO1xuaW1wb3J0IHsgUHJvamVjdEl0ZW0gfSBmcm9tICcuL3Byb2plY3QtaXRlbSc7XG5cbi8vIFByb2plY3RMaXN0IENsYXNzXG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3QgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PiBpbXBsZW1lbnRzIERyYWdUYXJnZXQge1xuICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiAnYWN0aXZlJyB8ICdmaW5pc2hlZCcpIHtcbiAgICBzdXBlcigncHJvamVjdC1saXN0JywgJ2FwcCcsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xuICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IFtdO1xuXG4gICAgdGhpcy5jb25maWd1cmUoKTtcbiAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSE7XG4gICAgICBsaXN0RWwuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XG4gICAgfVxuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBjb25zdCBwcmpJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xuICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChwcmpJZCwgdGhpcy50eXBlID09PSAnYWN0aXZlJyA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZCk7XG5cbiAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSE7XG4gICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyYWdMZWF2ZUhhbmRsZXIoXzogRHJhZ0V2ZW50KSB7XG4gICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xuICAgIGxpc3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKTtcbiAgfVxuXG4gIGNvbmZpZ3VyZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLmRyb3BIYW5kbGVyKTtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnTGVhdmVIYW5kbGVyKTtcblxuICAgIHByb2plY3RTdGF0ZS5hZGRMaXN0ZW5lcigocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xuICAgICAgY29uc3QgcmVsZXZhbnRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJqKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdhY3RpdmUnKSB7XG4gICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSByZWxldmFudFByb2plY3RzO1xuICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHtcbiAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCA9IGxpc3RJZDtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPSB0aGlzLnR5cGUgPT09ICdhY3RpdmUnID8gJ+Wun+ihjOS4reODl+ODreOCuOOCp+OCr+ODiCcgOiAn5a6M5LqG44OX44Ot44K444Kn44Kv44OIJztcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YCkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gICAgbGlzdEVsLmlubmVySFRNTCA9ICcnO1xuICAgIGZvciAoY29uc3QgcHJqSXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcbiAgICAgIG5ldyBQcm9qZWN0SXRlbShsaXN0RWwuaWQsIHByakl0ZW0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQnO1xuaW1wb3J0IHsgUHJvamVjdExpc3QgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1saXN0JztcblxubmV3IFByb2plY3RJbnB1dCgpO1xubmV3IFByb2plY3RMaXN0KCdhY3RpdmUnKTtcbm5ldyBQcm9qZWN0TGlzdCgnZmluaXNoZWQnKTtcbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInRlbXBsYXRlSWQiLCJob3N0RWxlbWVudElkIiwiaW5zZXJ0QXRTdGFydCIsIm5ld0VsZW1lbnRJZCIsInRoaXMiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaG9zdEVsZW1lbnQiLCJpbXBvcnRlZE5vZGUiLCJpbXBvcnROb2RlIiwiY29udGVudCIsImVsZW1lbnQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImlkIiwiYXR0YWNoIiwiaW5zZXJ0QXRCZWdpbm5pbmciLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJ2YWxpZGF0ZSIsInZhbGlkYXRhYmxlSW5wdXQiLCJpc1ZhbGlkIiwicmVxdWlyZWQiLCJ2YWx1ZSIsInRvU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIm1pbiIsIm1heCIsImF1dG9iaW5kIiwidGFyZ2V0IiwibWV0aG9kTmFtZSIsImRlc2NyaXB0b3IiLCJvcmlnaW5hbE1ldGhvZCIsImNvbmZpZ3VyYWJsZSIsImdldCIsImJpbmQiLCJQcm9qZWN0U3RhdHVzIiwiUHJvamVjdCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJtYW5kYXkiLCJzdGF0dXMiLCJQcm9qZWN0U3RhdGUiLCJsaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lciIsImxpc3RlbmVyRm4iLCJwdXNoIiwic3VwZXIiLCJwcm9qZWN0cyIsInN0YXRpYyIsImluc3RhbmNlIiwiYWRkUHJvamVjdCIsIm5ld1Byb2plY3QiLCJNYXRoIiwicmFuZG9tIiwiQWN0aXZlIiwidXBkYXRlTGlzdGVuZXJzIiwibW92ZVByb2plY3QiLCJwcm9qZWN0SWQiLCJuZXdTdGF0dXMiLCJwcm9qZWN0IiwiZmluZCIsInByaiIsInNsaWNlIiwicHJvamVjdFN0YXRlIiwiZ2V0SW5zdGFuY2UiLCJQcm9qZWN0SW5wdXQiLCJ0aXRsZUlucHV0RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkZXNjcmlwdGlvbklucHV0RWxlbWVudCIsIm1hbmRheUlucHV0RWxlbWVudCIsImNvbmZpZ3VyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWJtaXRIYW5kbGVyIiwicmVuZGVyQ29udGVudCIsImdhdGhlclVzZXJJbnB1dCIsImVudGVyZWRUaXRsZSIsImVudGVyZWREZXNjcmlwdGlvbiIsImVudGVyZWRNYW5kYXkiLCJkZXNjcmlwdGlvblZhbGlkYXRhYmxlIiwibWFuZGF5VmFsaWRhdGFibGUiLCJhbGVydCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ1c2VySW5wdXQiLCJBcnJheSIsImlzQXJyYXkiLCJkZXNjIiwiY2xlYXJJbnB1dHMiLCJQcm9qZWN0SXRlbSIsImhvc3RJZCIsImRyYWdTdGFydEhhbmRsZXIiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZWZmZWN0QWxsb3dlZCIsImRyYWdFbmRIYW5kbGVyIiwiXyIsImNvbnNvbGUiLCJsb2ciLCJ0ZXh0Q29udGVudCIsIlByb2plY3RMaXN0IiwidHlwZSIsImFzc2lnbmVkUHJvamVjdHMiLCJkcmFnT3ZlckhhbmRsZXIiLCJ0eXBlcyIsImNsYXNzTGlzdCIsImFkZCIsImRyb3BIYW5kbGVyIiwicHJqSWQiLCJnZXREYXRhIiwiRmluaXNoZWQiLCJyZW1vdmUiLCJkcmFnTGVhdmVIYW5kbGVyIiwicmVsZXZhbnRQcm9qZWN0cyIsImZpbHRlciIsInJlbmRlclByb2plY3RzIiwibGlzdElkIiwibGlzdEVsIiwiaW5uZXJIVE1MIiwicHJqSXRlbSJdLCJzb3VyY2VSb290IjoiIn0=