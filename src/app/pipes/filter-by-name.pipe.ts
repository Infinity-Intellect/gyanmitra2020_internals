import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByName"
})
export class FilterByNamePipe implements PipeTransform {
  transform(items: any, studentToSearch: String): any {
    studentToSearch = studentToSearch.toLowerCase();
    return items.filter(item => {
      if (item.studentName !== undefined) {
        return item.studentName.toLowerCase().includes(studentToSearch);
      }
    });
  }
}
