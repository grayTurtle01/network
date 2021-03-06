# Generated by Django 3.2.8 on 2021-11-19 21:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_auto_20211118_1828'),
    ]

    operations = [
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sources', to=settings.AUTH_USER_MODEL)),
                ('target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destinies', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
