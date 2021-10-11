from allauth.account.adapter import DefaultAccountAdapter


class CustomUserAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        """  save a new user """
        from allauth.account.utils import user_field
        user = super().save_user(request,user,form,False)
        user_field(user,'username',request.data.get('username',''))
        user_field(user,'password1',request.data.get('password1',''))
        user_field(user,'password2',request.data.get('password2',''))
        user_field(user,'email',request.data.get('email',''))
        user_field(user,'user_type',request.data.get('user_type',''))
        user.save()
        return user